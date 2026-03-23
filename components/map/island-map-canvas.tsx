"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { MapCompass } from "@/components/map/map-compass";
import { PoiRouteQrModal, getGoogleMapsUrl } from "@/components/map/poi-route-qr-modal";
import { useAppMode } from "@/components/providers/app-mode-provider";
import type { PointOfInterest } from "@/features/map/map.types";
import { pointOfInterestLegend, pointsOfInterest } from "@/features/map/map.data";
import { withBasePath } from "@/lib/site";

const SVG_VIEWBOX_WIDTH = 14731.64444;
const SVG_VIEWBOX_HEIGHT = 8286.55;
const SVG_PADDING_X = 3200;
const SVG_PADDING_Y = 2000;
const SEA_BACKGROUND_BLEED_X = 2985;
const SEA_BACKGROUND_BLEED_Y = 1120;
const SVG_SCENE_MIN_X = -SVG_PADDING_X;
const SVG_SCENE_MIN_Y = -SVG_PADDING_Y;
const SVG_SCENE_WIDTH = SVG_VIEWBOX_WIDTH + SVG_PADDING_X * 2;
const SVG_SCENE_HEIGHT = SVG_VIEWBOX_HEIGHT + SVG_PADDING_Y * 2;
const DEFAULT_ZOOM_INDEX = 2;
const DEFAULT_VIEW_CENTER = {
  mapX: 6289,
  mapY: 4366
} as const;
const ZOOM_LEVELS = [1, 1.08, 1.16, 1.24, 1.42, 1.62, 1.84, 2.08, 2.36, 2.68, 3.04, 3.44, 3.88, 4.36, 4.88, 5.44, 6.04, 6.68, 7.36];

const mapPaths = {
  lampione:
    "M -1396.39 625.44 L -1477.99 736.23 L -1505.19 917.21 L -1551.58 1061.82 L -1577.98 1135.4 L -1578.78 1240.27 L -1561.98 1323.99 L -1615.58 1419.56 L -1564.38 1553.18 L -1465.99 1638.59 L -1357.99 1698.64 L -1258.8 1704.56 L -1159.6 1655.51 L -1098.8 1594.62 L -1091.6 1451.69 L -990.81 1374.73 L -970.01 1347.67 L -874.01 1313.84 L -842.02 1213.21 L -846.82 1177.69 L -764.42 1160.77 L -771.62 1076.2 L -863.62 1011.08 L -948.41 873.23 L -1077.21 823.34 L -1396.39 625.44 Z",
  lampedusa:
    "M 500 4725.15 L 607.17 4869.28 L 758.78 4870.55 L 829.15 4963.79 L 982.69 4971.03 L 1058.55 5066.1 L 1282.85 5068.34 L 1355.97 5162.49 L 1510.23 5168.89 L 1577.8 5263.75 L 1732.04 5270.99 L 1890.37 5086.93 L 1961.04 5085.31 L 2036.87 5182.06 L 2263.16 5187.71 L 2334.2 5282.65 L 2714.9 5288.75 L 2790.09 5383.78 L 3090.44 5391.26 L 3160.83 5484.47 L 3312.45 5485.7 L 3388.37 5579.9 L 3617.21 5594.89 L 3685.66 5682.98 L 3990.86 5690.54 L 4068.85 5784.78 L 4290.32 5790.26 L 4366.22 5885.3 L 4817.39 5898.98 L 4854.39 5943.08 L 4854.11 6038.77 L 4925.19 6132.84 L 4925.06 6222.61 L 5033.07 6364.16 L 5186.72 6367.95 L 5254.98 6464.48 L 5330.48 6463.8 L 5408.11 6376.78 L 5637.2 6382.41 L 5750.15 6520.69 L 5745.05 6615.42 L 5782.04 6660.37 L 6087.27 6667.85 L 6233.55 6859.45 L 6379.76 6856.26 L 6462.94 6768.52 L 6538.3 6773.75 L 6569.77 6817.71 L 6570.2 6913.42 L 6494.55 7004.73 L 6492.23 7099.53 L 6411.99 7180.56 L 6448.86 7230.58 L 6677.88 7239.57 L 6714.3 7194.73 L 6716.64 7099.09 L 6753.08 7053.4 L 6831.13 7062.08 L 6944.1 7200.34 L 6936.83 7384.79 L 7047.04 7522.98 L 7122.49 7524.82 L 7198.44 7619.83 L 7273.97 7618.28 L 7502.76 7352.85 L 7580.29 7354.74 L 7616.72 7309.05 L 7623.9 7213.53 L 7738.63 7080.82 L 7814.16 7079.27 L 7853.23 7124.26 L 7846.08 7218.93 L 7885.03 7269 L 8036.7 7269.3 L 8075.78 7314.28 L 7953.98 7452.75 L 7883.44 7448.5 L 7686.02 7677.44 L 7681.53 7861.95 L 7718.39 7912.81 L 7796.67 7912.18 L 7865.06 8005.3 L 7947.51 7918.38 L 8018.18 7917.56 L 8176.44 7732.55 L 8481.56 7745.88 L 8513.02 7790.68 L 8513.5 7885.54 L 8549.81 7930.46 L 8855.08 7937.85 L 8932.7 7849.96 L 9008.23 7848.4 L 9076.59 7943.21 L 9381.73 7955.66 L 9420.38 7904.08 L 9420.59 7809.24 L 9542.23 7676.68 L 9693.06 7682.85 L 9725.25 7726.82 L 9725.02 7822.51 L 9764.82 7866.66 L 9840.27 7868.48 L 9910.71 7963.33 L 10215.86 7975.75 L 10330.01 7837.07 L 10334.67 7556.87 L 10417.2 7465.7 L 10416.71 7370.84 L 10495 7282.95 L 10494.39 7193.17 L 10576.95 7100.3 L 10537.86 7055.33 L 10316.44 7047.46 L 10277.33 7003.33 L 10284.07 6723.18 L 10247.04 6679.1 L 9788.17 6668.05 L 9751.83 6623.99 L 9870.9 6482.04 L 9948.97 6489.85 L 9985.53 6438.23 L 9992.76 6252.93 L 9877.68 6114.66 L 9801.47 6116.21 L 9618.11 5880.59 L 9701.47 5783.52 L 9700.84 5694.58 L 9744.79 5652.45 L 9815.46 5650.77 L 9859.63 5599.33 L 9859 5510.39 L 9898.11 5468.14 L 10049.05 5468.39 L 10124.62 5377.9 L 10278.19 5384.14 L 10392.17 5251.38 L 10284.91 5104.84 L 10131.23 5103.68 L 10055.25 5009.54 L 9904.48 5002.52 L 9833.36 4908.49 L 8772.55 4882.85 L 8704.06 4794.81 L 8475.24 4779.95 L 8399.14 4691.72 L 8253.22 4684.79 L 8174.5 4590.56 L 8106.6 4592.3 L 8030.74 4494.76 L 7955.23 4496.31 L 7877.64 4583.34 L 7801.45 4584.88 L 7565.66 4856.07 L 7192.74 4844.43 L 7110.22 4934.73 L 6963.43 4934.53 L 6888.27 4837 L 6583.04 4832.07 L 6512.62 4738.88 L 6207.46 4731.41 L 6131.55 4636.38 L 5229.98 4610.84 L 5154.13 4514.12 L 5000.36 4516.25 L 4924.82 4603.32 L 4773.89 4602.98 L 4702.82 4508.91 L 4627.39 4507.05 L 4551.48 4412.86 L 4397.95 4405.68 L 4326.9 4310.76 L 4176.12 4304.49 L 4100.32 4401.7 L 3649.93 4387.15 L 3571.28 4292.04 L 3266.82 4284.48 L 3198.52 4191.32 L 3044.84 4190.03 L 2968.94 4095.83 L 2892.75 4097.32 L 2822.49 3999.02 L 2747.14 3994.61 L 2676.01 3903.91 L 2600.67 3898.64 L 2522.04 3803.52 L 2449.38 3801.71 L 2378.32 3708.47 L 1997.7 3701.5 L 1922.75 3791.94 L 1844.56 3789.99 L 1686.4 3968.12 L 1235.25 3956.81 L 1159.5 4050.62 L 1084 4052.11 L 1006.49 4133.17 L 930.98 4134.66 L 619.32 4496.09 L 543.89 4494.19 L 504.66 4539.79 L 500 4725.15 Z",
  linosa:
    "M 11155.93444 1292.3 L 11194.81444 1342.27 L 11423.54444 1347.31 L 11530.72444 1488.54 L 11519.88444 1855.81 L 11595.65444 1952.32 L 11595.75444 2042.08 L 11818.34444 2327.26 L 11811.57444 2416.02 L 11850.44444 2466.84 L 11925.60444 2465.95 L 11996.55444 2562.35 L 12299.73444 2568.99 L 12376.86444 2478.38 L 12527.82444 2479.15 L 12673.92444 2670.33 L 12751.85444 2668.65 L 12903.92444 2492.45 L 13431.15444 2498.87 L 13499.44444 2591.81 L 13730.19444 2600.22 L 13798.45444 2694.85 L 14104.39444 2701.5 L 14217.59444 2567.62 L 14231.64444 1920.15 L 14160.67444 1823.77 L 14160.62444 1730.62 L 14089.65444 1634.24 L 14104.39444 1082.47 L 14064.81444 1032.49 L 13989.72444 1030.86 L 13874.86444 892.88 L 13881.78444 796.5 L 13956.79444 706.68 L 13956.13444 610.13 L 13887.85444 517.19 L 13887.73444 427.43 L 13855.63444 382.7 L 13627.61444 377.74 L 13551.83444 281.25 L 13404.34444 281.42 L 13321.75444 371.07 L 13100.68444 363.71 L 13023.58444 454.32 L 12948.49444 452.68 L 12872.66444 358.73 L 12795.48444 452.73 L 12642.63444 445.99 L 12574.25444 358.12 L 12122.42444 344.83 L 12045.37444 432.9 L 11970.20444 434.64 L 11932.00444 479.52 L 11932.02444 572.67 L 11886.37444 611.47 L 11818.11444 612.51 L 11736.08444 707.24 L 11512.87444 702.33 L 11435.83444 789.54 L 11359.88444 701.5 L 11245.96444 835.32 L 11233.08444 1200.85 L 11155.93444 1292.3 Z",
  rabbitIslet:
    "M 3717.63 6013.22 L 3824.99 6152.23 L 3903.2 6154.17 L 3939.65 6108.49 L 3946.84 6013.81 L 4022.51 5922.53 L 3915.13 5784.36 L 3764.34 5777.24 L 3725.12 5822.85 L 3717.63 6013.22 Z"
} as const;

type TooltipPosition = {
  top: number;
  left: number;
};

type ViewportSize = {
  width: number;
  height: number;
};

type MapCoordinate = {
  mapX: number;
  mapY: number;
};

type IslandMapCanvasProps = {
  points?: PointOfInterest[];
  onMapCoordinatePick?: (coordinates: MapCoordinate) => void;
  pointInsertionMode?: boolean;
  highlightedPoiId?: string | null;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Clamps a center coordinate (SVG user units) so the viewBox never pans outside the scene. */
function clampCenter(center: MapCoordinate, zoom: number): MapCoordinate {
  const vbW = SVG_SCENE_WIDTH / zoom;
  const vbH = SVG_SCENE_HEIGHT / zoom;

  return {
    mapX: clamp(center.mapX, SVG_SCENE_MIN_X + vbW / 2, SVG_SCENE_MIN_X + SVG_SCENE_WIDTH - vbW / 2),
    mapY: clamp(center.mapY, SVG_SCENE_MIN_Y + vbH / 2, SVG_SCENE_MIN_Y + SVG_SCENE_HEIGHT - vbH / 2)
  };
}

/**
 * Returns CSS pixels per SVG user unit at the current zoom level.
 * Equivalent to the old getSvgRenderedScale but expressed directly
 * from viewport + zoom rather than from a derived viewBox.
 */
function getPpu(viewportSize: ViewportSize, zoom: number): number {
  if (!viewportSize.width || !viewportSize.height) return zoom;

  return Math.min(viewportSize.width / SVG_SCENE_WIDTH, viewportSize.height / SVG_SCENE_HEIGHT) * zoom;
}

/**
 * CSS transform string for the inner <g> that holds all map content.
 * Maps SVG user units → CSS pixels so the given center coordinate
 * appears at the viewport center.
 *
 * Using a <g> CSS transform instead of the SVG viewBox means the SVG
 * element itself never changes; only a GPU-compositor transform is
 * applied — zero SVG re-layout, zero filter re-rasterisation per frame.
 */
function getGroupTransform(center: MapCoordinate, zoom: number, viewportSize: ViewportSize): string {
  const ppu = getPpu(viewportSize, zoom);
  const tx = viewportSize.width / 2 - center.mapX * ppu;
  const ty = viewportSize.height / 2 - center.mapY * ppu;

  return `translate(${tx}px, ${ty}px) scale(${ppu})`;
}

export function IslandMapCanvas({
  points = pointsOfInterest,
  onMapCoordinatePick,
  pointInsertionMode = false,
  highlightedPoiId = null
}: IslandMapCanvasProps) {
  const [activePoiId, setActivePoiId] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isViewReady, setIsViewReady] = useState(false);
  const [zoomLevelIndex, setZoomLevelIndex] = useState(DEFAULT_ZOOM_INDEX);
  const [center, setCenter] = useState<MapCoordinate>(DEFAULT_VIEW_CENTER);
  const [viewportSize, setViewportSize] = useState<ViewportSize>({ width: 0, height: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [routeQrTarget, setRouteQrTarget] = useState<PointOfInterest | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const markerRefs = useRef<Record<string, SVGGElement | null>>({});
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const hasUserAdjustedViewRef = useRef(false);
  const initialCenterRef = useRef<MapCoordinate>(DEFAULT_VIEW_CENTER);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originCenter: MapCoordinate;
    /** Live center updated on every pointermove — synced to React state once on pointerup. */
    currentCenter: MapCoordinate;
    didMove: boolean;
  } | null>(null);
  /**
   * Tracks the authoritative live center outside React state.
   * Updated during drag and wheel so that accumulated wheel deltas
   * read the correct base value without depending on React's async state.
   */
  const liveCenterRef = useRef<MapCoordinate>(DEFAULT_VIEW_CENTER);

  const zoom = ZOOM_LEVELS[zoomLevelIndex];
  const tooltipEnabled = !pointInsertionMode;

  // Keep liveCenterRef in sync with React state when center changes
  // (zoom adjustments, initial setup, post-pan state sync).
  // The guard prevents overwriting the live panning value mid-drag.
  if (!dragStateRef.current) {
    liveCenterRef.current = center;
  }
  const activePoi = points.find((poi) => poi.id === activePoiId);
  const { isTotemMode } = useAppMode();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!points.length) {
      setActivePoiId("");
      return;
    }

    if (!activePoiId) {
      return;
    }

    if (!points.some((poi) => poi.id === activePoiId)) {
      setActivePoiId("");
    }
  }, [activePoiId, points]);

  useEffect(() => {
    if (pointInsertionMode) {
      setActivePoiId("");
      setTooltipPosition(null);
    }
  }, [pointInsertionMode]);

  useEffect(() => {
    if (!routeQrTarget) {
      return;
    }

    if (!points.some((poi) => poi.id === routeQrTarget.id)) {
      setRouteQrTarget(null);
    }
  }, [points, routeQrTarget]);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      setZoomLevelIndex(ZOOM_LEVELS.length - 1);
      initialCenterRef.current = { mapX: 6427, mapY: 6144 };
    }
  }, []);

  useLayoutEffect(() => {
    const viewportElement = viewportRef.current;

    if (!viewportElement) {
      return;
    }

    const updateViewportSize = () => {
      const rect = viewportElement.getBoundingClientRect();

      setViewportSize({
        width: rect.width,
        height: rect.height
      });
    };

    updateViewportSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateViewportSize);

      return () => {
        window.removeEventListener("resize", updateViewportSize);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      updateViewportSize();
    });

    resizeObserver.observe(viewportElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (!viewportSize.width || !viewportSize.height) {
      return;
    }

    setCenter((currentCenter) =>
      hasUserAdjustedViewRef.current
        ? clampCenter(currentCenter, zoom)
        : clampCenter(initialCenterRef.current, zoom)
    );
    setIsViewReady(true);
  }, [viewportSize, zoom]);

  useEffect(() => {
    if (!activePoiId || !tooltipEnabled) {
      setTooltipPosition(null);
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) {
        setActivePoiId("");
        return;
      }

      if (event.target.closest("[data-poi-marker='true']")) {
        return;
      }

      if (event.target.closest("[data-poi-tooltip='true']")) {
        return;
      }

      setActivePoiId("");
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activePoiId, tooltipEnabled]);

  useEffect(() => {
    if (!activePoiId || !isClient || !tooltipEnabled) {
      return;
    }

    const updateTooltipPosition = () => {
      const activeMarker = markerRefs.current[activePoiId];
      const tooltipElement = tooltipRef.current;

      if (!activeMarker || !tooltipElement) {
        return;
      }

      const markerRect = activeMarker.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();
      const viewportPadding = 16;
      const tooltipGap = 18;

      const left = Math.min(
        Math.max(markerRect.left + markerRect.width / 2 - tooltipRect.width / 2, viewportPadding),
        window.innerWidth - tooltipRect.width - viewportPadding
      );

      const hasRoomAbove = markerRect.top >= tooltipRect.height + tooltipGap + viewportPadding;
      const top = hasRoomAbove
        ? markerRect.top - tooltipRect.height - tooltipGap
        : Math.min(markerRect.bottom + tooltipGap, window.innerHeight - tooltipRect.height - viewportPadding);

      setTooltipPosition({
        left,
        top: Math.max(viewportPadding, top)
      });
    };

    updateTooltipPosition();

    window.addEventListener("resize", updateTooltipPosition);
    window.addEventListener("scroll", updateTooltipPosition, true);

    return () => {
      window.removeEventListener("resize", updateTooltipPosition);
      window.removeEventListener("scroll", updateTooltipPosition, true);
    };
  }, [activePoiId, isClient, center, viewportSize, zoom, tooltipEnabled]);

  const getMapCoordinatesFromClientPoint = (clientX: number, clientY: number): MapCoordinate | null => {
    const svgElement = svgRef.current;

    if (!svgElement) {
      return null;
    }

    const rect = svgElement.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      return null;
    }

    const screenX = clientX - rect.left;
    const screenY = clientY - rect.top;

    if (screenX < 0 || screenX > rect.width || screenY < 0 || screenY > rect.height) {
      return null;
    }

    // Inverse of getGroupTransform: screen → map coordinates.
    // screen = mapCoord * ppu + (viewportW/2 - center * ppu)
    // mapCoord = (screen - viewportW/2) / ppu + center
    const ppu = getPpu(viewportSize, zoom);

    return {
      mapX: Math.round(clamp((screenX - rect.width / 2) / ppu + center.mapX, SVG_SCENE_MIN_X, SVG_SCENE_MIN_X + SVG_SCENE_WIDTH)),
      mapY: Math.round(clamp((screenY - rect.height / 2) / ppu + center.mapY, SVG_SCENE_MIN_Y, SVG_SCENE_MIN_Y + SVG_SCENE_HEIGHT))
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    if (event.target.closest("[data-map-control='true']")) {
      return;
    }

    if (!pointInsertionMode && event.target.closest("[data-poi-marker='true']")) {
      return;
    }

    if (event.button !== 0 && event.pointerType === "mouse") {
      return;
    }

    setActivePoiId("");
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originCenter: center,
      currentCenter: center,
      didMove: false
    };

    setIsPanning(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - dragState.startX;
    const dy = event.clientY - dragState.startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragState.didMove = true;
      hasUserAdjustedViewRef.current = true;
    }

    const ppu = getPpu(viewportSize, zoom);
    const nextCenter = clampCenter(
      {
        mapX: dragState.originCenter.mapX - dx / ppu,
        mapY: dragState.originCenter.mapY - dy / ppu
      },
      zoom
    );

    dragState.currentCenter = nextCenter;
    liveCenterRef.current = nextCenter;

    // CSS transform on the inner <g> — handled entirely by the GPU compositor.
    // The SVG element itself never moves; only its content layer is repositioned.
    // No SVG re-layout, no filter re-rasterisation. React state is synced once on pointerup.
    if (gRef.current) {
      gRef.current.style.transform = getGroupTransform(nextCenter, zoom, viewportSize);
    }
  };

  const endPan = (event?: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (
      event &&
      dragState &&
      !dragState.didMove &&
      pointInsertionMode &&
      onMapCoordinatePick &&
      event.target instanceof Element &&
      !event.target.closest("[data-poi-marker='true']") &&
      !event.target.closest("[data-map-control='true']")
    ) {
      const coordinates = getMapCoordinatesFromClientPoint(event.clientX, event.clientY);

      if (coordinates) {
        onMapCoordinatePick(coordinates);
      }
    }

    if (event && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    // Commit the final pan position to React state. This triggers one re-render
    // that sets the <g> style.transform via JSX, naturally overwriting whatever
    // value was applied directly during the drag — no manual cleanup needed.
    if (dragState?.didMove) {
      setCenter(dragState.currentCenter);
    }

    dragStateRef.current = null;
    setIsPanning(false);
  };

  const wheelFlushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActivePoiId("");
    hasUserAdjustedViewRef.current = true;

    const ppu = getPpu(viewportSize, zoom);
    const nextCenter = clampCenter(
      {
        mapX: liveCenterRef.current.mapX + event.deltaX / ppu,
        mapY: liveCenterRef.current.mapY + event.deltaY / ppu
      },
      zoom
    );

    // Direct DOM update on the <g> + debounced React state sync.
    // liveCenterRef accumulates deltas so each wheel event reads the correct base.
    liveCenterRef.current = nextCenter;
    if (gRef.current) {
      gRef.current.style.transform = getGroupTransform(nextCenter, zoom, viewportSize);
    }

    if (wheelFlushTimerRef.current !== null) {
      clearTimeout(wheelFlushTimerRef.current);
    }
    wheelFlushTimerRef.current = setTimeout(() => {
      setCenter(liveCenterRef.current);
      wheelFlushTimerRef.current = null;
    }, 150);
  };

  const togglePoi = (poiId: string) => {
    setActivePoiId((currentPoiId) => (currentPoiId === poiId ? "" : poiId));
  };

  const handleRouteAction = (poi: PointOfInterest) => {
    const googleMapsUrl = getGoogleMapsUrl(poi);

    if (!googleMapsUrl) {
      return;
    }

    setActivePoiId("");
    setTooltipPosition(null);

    if (isTotemMode) {
      setRouteQrTarget(poi);
      return;
    }

    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  const zoomIn = () => {
    hasUserAdjustedViewRef.current = true;
    setZoomLevelIndex((currentIndex) => Math.min(currentIndex + 1, ZOOM_LEVELS.length - 1));
  };

  const zoomOut = () => {
    hasUserAdjustedViewRef.current = true;
    setZoomLevelIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  return (
    <div className="relative isolate h-full overflow-visible">
      <div
        className="absolute inset-0 overflow-hidden rounded-[1.8rem] border border-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
        style={{
          background: "linear-gradient(135deg, #0f5670 0%, #176987 38%, #1d7fa2 68%, #22799a 100%)"
        }}
      >
        <div
          ref={viewportRef}
          className={`absolute inset-0 touch-none select-none ${isPanning ? "cursor-grabbing" : "cursor-grab"}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPan}
          onPointerCancel={endPan}
          onWheel={handleWheel}
        >
          <svg
            ref={svgRef}
            className="absolute inset-0 h-full w-full overflow-hidden"
            style={{ visibility: isViewReady ? "visible" : "hidden" }}
            aria-label="Mappa interattiva di Lampedusa, Linosa e Lampione"
            role="img"
          >
            {/*
              All map content lives inside this <g>. Pan and zoom are applied as a
              CSS transform here — the SVG element itself never moves, so there is
              no clipping at the container edge. With will-change: transform the
              browser promotes this group to its own GPU compositing layer; every
              pointermove only triggers a compositor-thread texture repositioning —
              no SVG re-layout, no filter re-rasterisation, no main-thread work.
            */}
            <g
              ref={gRef}
              style={{
                transform: getGroupTransform(center, zoom, viewportSize),
                transformOrigin: "0 0",
                willChange: "transform"
              }}
            >
            <defs>
              <linearGradient
                id="seaGradient"
                x1={SVG_SCENE_MIN_X}
                y1={SVG_SCENE_MIN_Y}
                x2={SVG_SCENE_MIN_X + SVG_SCENE_WIDTH}
                y2={SVG_SCENE_MIN_Y + SVG_SCENE_HEIGHT}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#0f5670" />
                <stop offset="38%" stopColor="#176987" />
                <stop offset="68%" stopColor="#1d7fa2" />
                <stop offset="100%" stopColor="#22799a" />
              </linearGradient>
              <radialGradient
                id="seaGlow"
                cx={SVG_SCENE_MIN_X + SVG_SCENE_WIDTH * 0.34}
                cy={SVG_SCENE_MIN_Y + SVG_SCENE_HEIGHT * 0.58}
                r={Math.max(SVG_SCENE_WIDTH, SVG_SCENE_HEIGHT) * 0.6}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="lampedusaGradient" x1="0%" y1="16%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d9c89e" />
                <stop offset="48%" stopColor="#bea779" />
                <stop offset="100%" stopColor="#9f8961" />
              </linearGradient>
              <linearGradient id="lampioneGradient" x1="0%" y1="2%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d8c6a0" />
                <stop offset="48%" stopColor="#bba37a" />
                <stop offset="100%" stopColor="#9a8463" />
              </linearGradient>
              <linearGradient id="linosaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d5c39c" />
                <stop offset="48%" stopColor="#b9a174" />
                <stop offset="100%" stopColor="#99825e" />
              </linearGradient>
              <linearGradient id="rabbitIsletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d3c095" />
                <stop offset="100%" stopColor="#9a8460" />
              </linearGradient>
              <filter id="islandShadow" x="-18%" y="-18%" width="140%" height="150%">
                <feDropShadow dx="0" dy="110" stdDeviation="120" floodColor="#163448" floodOpacity="0.18" />
              </filter>
              <filter id="markerShadow" x="-200%" y="-200%" width="400%" height="400%">
                <feDropShadow dx="0" dy="55" stdDeviation="70" floodColor="#11263a" floodOpacity="0.28" />
              </filter>
            </defs>

            <rect
              x={SVG_SCENE_MIN_X - SEA_BACKGROUND_BLEED_X}
              y={SVG_SCENE_MIN_Y - SEA_BACKGROUND_BLEED_Y}
              width={SVG_SCENE_WIDTH + SEA_BACKGROUND_BLEED_X * 2}
              height={SVG_SCENE_HEIGHT + SEA_BACKGROUND_BLEED_Y * 2}
              fill="url(#seaGradient)"
            />
            <rect
              x={SVG_SCENE_MIN_X - SEA_BACKGROUND_BLEED_X}
              y={SVG_SCENE_MIN_Y - SEA_BACKGROUND_BLEED_Y}
              width={SVG_SCENE_WIDTH + SEA_BACKGROUND_BLEED_X * 2}
              height={SVG_SCENE_HEIGHT + SEA_BACKGROUND_BLEED_Y * 2}
              fill="url(#seaGlow)"
            />
            <ellipse cx="-1190" cy="1165" rx="920" ry="700" fill="#72d9ef" opacity="0.08" />
            <ellipse cx="3760" cy="6680" rx="1800" ry="900" fill="#6ad6f1" opacity="0.06" />
            <ellipse cx="9040" cy="6480" rx="2400" ry="1100" fill="#5ecde7" opacity="0.05" />
            <ellipse cx="12860" cy="1860" rx="1400" ry="820" fill="#70d8ef" opacity="0.07" />

            <g opacity="0.88">
              <path d={mapPaths.lampione} fill="none" stroke="#79dff1" strokeOpacity="0.3" strokeWidth="220" strokeLinejoin="round" />
              <path d={mapPaths.lampedusa} fill="none" stroke="#79dff1" strokeOpacity="0.28" strokeWidth="280" strokeLinejoin="round" />
              <path d={mapPaths.linosa} fill="none" stroke="#79dff1" strokeOpacity="0.3" strokeWidth="240" strokeLinejoin="round" />
              <path d={mapPaths.rabbitIslet} fill="none" stroke="#79dff1" strokeOpacity="0.22" strokeWidth="170" strokeLinejoin="round" />
              <path d={mapPaths.lampione} fill="none" stroke="#9cecff" strokeOpacity="0.18" strokeWidth="110" strokeLinejoin="round" />
              <path d={mapPaths.lampedusa} fill="none" stroke="#9cecff" strokeOpacity="0.18" strokeWidth="140" strokeLinejoin="round" />
              <path d={mapPaths.linosa} fill="none" stroke="#9cecff" strokeOpacity="0.18" strokeWidth="120" strokeLinejoin="round" />
              <path d={mapPaths.rabbitIslet} fill="none" stroke="#9cecff" strokeOpacity="0.14" strokeWidth="84" strokeLinejoin="round" />
            </g>

            <g filter="url(#islandShadow)">
              <path d={mapPaths.lampione} fill="url(#lampioneGradient)" stroke="#f3e6c7" strokeWidth="12" strokeLinejoin="round" />
              <path d={mapPaths.lampedusa} fill="url(#lampedusaGradient)" stroke="#f3e6c7" strokeWidth="14" strokeLinejoin="round" />
              <path d={mapPaths.rabbitIslet} fill="url(#rabbitIsletGradient)" stroke="#f3e6c7" strokeWidth="10" strokeLinejoin="round" />
              <path d={mapPaths.linosa} fill="url(#linosaGradient)" stroke="#f3e6c7" strokeWidth="14" strokeLinejoin="round" />
            </g>

            <path d={mapPaths.lampione} fill="none" stroke="#726a4f" strokeOpacity="0.16" strokeWidth="8" strokeLinejoin="round" />
            <path d={mapPaths.lampedusa} fill="none" stroke="#726a4f" strokeOpacity="0.18" strokeWidth="10" strokeLinejoin="round" />
            <path d={mapPaths.linosa} fill="none" stroke="#726a4f" strokeOpacity="0.18" strokeWidth="10" strokeLinejoin="round" />
            <path d={mapPaths.rabbitIslet} fill="none" stroke="#726a4f" strokeOpacity="0.14" strokeWidth="8" strokeLinejoin="round" />

            {points.map((poi) => {
              const color = pointOfInterestLegend[poi.category];
              const isActive = (tooltipEnabled && poi.id === activePoiId) || poi.id === highlightedPoiId;
              const isTooltipOpen = tooltipEnabled && poi.id === activePoiId;

              return (
                <g
                  key={poi.id}
                  ref={(element) => {
                    markerRefs.current[poi.id] = element;
                  }}
                  transform={`translate(${poi.mapX} ${poi.mapY})`}
                  data-poi-marker="true"
                  role="button"
                  tabIndex={pointInsertionMode ? -1 : 0}
                  aria-label={poi.name}
                  aria-pressed={isActive}
                  aria-describedby={isTooltipOpen ? `poi-tooltip-${poi.id}` : undefined}
                  className="cursor-pointer focus:outline-none"
                  onClick={() => {
                    if (!pointInsertionMode) {
                      togglePoi(poi.id);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (pointInsertionMode) {
                      return;
                    }

                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      togglePoi(poi.id);
                    }
                  }}
                >
                  <circle r={isActive ? 205 : 165} fill={color} opacity={0.22} />
                  <circle r={isActive ? 126 : 106} fill={color} stroke="#ffffff" strokeWidth="34" />
                </g>
              );
            })}
            </g>
          </svg>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-full bg-white/76 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-navy-950/60 shadow-[0_12px_24px_rgba(16,36,63,0.12)] backdrop-blur">
        Trascina con mouse o touch
      </div>

      <div data-map-control="true" className="absolute right-4 top-4 z-20 flex flex-col items-center gap-3">
        <MapCompass />
        <div className="overflow-hidden rounded-[1.2rem] border border-white/55 bg-white/84 shadow-[0_18px_40px_rgba(16,36,63,0.16)] backdrop-blur">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center text-navy-950 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:text-navy-950/30"
            onClick={zoomIn}
            disabled={zoomLevelIndex === ZOOM_LEVELS.length - 1}
            aria-label="Aumenta lo zoom"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </button>
          <div className="h-px bg-navy-950/10" />
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center text-navy-950 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:text-navy-950/30"
            onClick={zoomOut}
            disabled={zoomLevelIndex === 0}
            aria-label="Riduci lo zoom"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14" />
            </svg>
          </button>
        </div>
      </div>

      {tooltipEnabled && isClient && activePoi
        ? createPortal(
            <div
              ref={tooltipRef}
              id={`poi-tooltip-${activePoi.id}`}
              role="tooltip"
              data-poi-tooltip="true"
              className="pointer-events-auto fixed z-[80] w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.35rem] bg-white/96 p-3 text-left shadow-[0_18px_40px_rgba(16,36,63,0.16)]"
              style={{
                left: tooltipPosition?.left ?? -9999,
                top: tooltipPosition?.top ?? -9999,
                visibility: tooltipPosition ? "visible" : "hidden"
              }}
            >
              <div className="relative h-52 overflow-hidden rounded-[1rem] bg-slate-100">
                <Image
                  src={withBasePath(activePoi.imageSrc)}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="320px"
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  aria-label="Chiudi"
                  onClick={() => setActivePoiId("")}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy-950/60 text-white backdrop-blur transition hover:bg-navy-950/80"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6 6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-1 pb-1 pt-3">
                <p className="text-sm font-semibold text-navy-950">{activePoi.name}</p>
                <p className="mt-2 text-sm leading-6 text-navy-900/70">{activePoi.description}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleRouteAction(activePoi)}
                    disabled={activePoi.latitude === null || activePoi.longitude === null}
                    className="inline-flex items-center justify-center rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-900 disabled:cursor-not-allowed disabled:bg-navy-950/20 disabled:text-navy-950/35"
                  >
                    Portami li
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}

      <PoiRouteQrModal isOpen={Boolean(routeQrTarget)} point={routeQrTarget} onClose={() => setRouteQrTarget(null)} />
    </div>
  );
}

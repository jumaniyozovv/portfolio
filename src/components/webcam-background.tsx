"use client";

import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";

export function WebcamBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <WebcamPixelGrid
        gridCols={80}
        gridRows={60}
        maxElevation={12}
        motionSensitivity={0.3}
        elevationSmoothing={0.08}
        colorMode="monochrome"
        monochromeColor="#8b5cf6"
        backgroundColor="#0a0a0a"
        darken={0.6}
        gapRatio={0.08}
        borderOpacity={0.04}
      />
    </div>
  );
}

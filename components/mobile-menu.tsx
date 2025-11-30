"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import CollapsibleSidebar from "@/components/collapsible-sidebar";
import { Button } from "@/components/ui/button";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="w-8 h-8"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-64 h-full">
            <CollapsibleSidebar className="h-full" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute z-10 w-8 h-8 top-4 right-4"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className= "bg-white shadow-sm py-4 relative" >
    <div className="container mx-auto px-4 flex items-center" >
      {/* Logo + Nom du site */ }
      < div className = "flex items-center" >
        <img
            src="/image/joy-ci.png"
  alt = "Logo"
  className = "h-10 w-10 mr-3 rounded-full object-cover"
    />
    <h1 className="text-2xl from-neutral-50 text-gray-800" > JOY-CI </h1>
      </div>

  {/* Menu déroulant pour le mode */ }
  <div className="absolute right-4 top-1/2 transform -translate-y-1/2" >
    <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors" >
      <Sun className="h-4 w-4 text-gray-700" />
        <span className="text-sm font-medium" > Mode </span>
          </DropdownMenuTrigger>
          < DropdownMenuContent className = "w-40" align = "end" >
            <DropdownMenuLabel>Choisir le mode </DropdownMenuLabel>
              < DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2" >
                <Sun className="h-4 w-4" />
                  <span>Jour </span>
                  </DropdownMenuItem>
                  < DropdownMenuItem className = "flex items-center gap-2" >
                    <Moon className="h-4 w-4" />
                      <span>Nuit </span>
                      </DropdownMenuItem>
                      </DropdownMenuContent>
                      </DropdownMenu>
                      </div>
                      </div>
                      </header>
  );
};

export default Header;
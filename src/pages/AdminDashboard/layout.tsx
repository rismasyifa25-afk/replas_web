import React from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/sidebar-admin";

export default function Layout() {
  const location = useLocation();

  const dashboardPath = location.pathname.startsWith("/dashboard")
    ? location.pathname.replace(/^\/dashboard\/?/, "")
    : "";

  const crumbs = dashboardPath.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1 mx-5" />
          <div className="items-center px-4 lg:block hidden">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {crumbs.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      {idx === crumbs.length - 1 ? (
                        <BreadcrumbPage>
                          
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={`/dashboard/${crumbs
                            .slice(0, idx + 1)
                            .join("/")}`}
                        >
                          {decodeURIComponent(crumb)}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-0 px-4 pt-0 -mt-13 md:ml-59">
            <div className="w-full bg-sidebar h-full rounded-t-xl px-4 py-4"><Outlet /></div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

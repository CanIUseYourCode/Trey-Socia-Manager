import { Home, FileCheck, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const items = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Approvals', url: '/approval', icon: FileCheck },
  { title: 'Content Library', url: '/contents', icon: CheckCircle2 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-transparent">
      <div className="flex h-full flex-col bg-card/50 backdrop-blur-xl border-r border-border/40">
        <SidebarContent className="p-4 gap-4">
          <SidebarGroup className="p-0">
            <div className={`flex items-center gap-3 px-2 mb-8 ${state === 'collapsed' ? 'justify-center' : ''}`}>
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary shadow-lg shadow-primary/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {state !== 'collapsed' && (
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-lg leading-none">Social<span className="text-primary">Manager</span></span>
                  <span className="text-xs text-muted-foreground">Pro Workspace</span>
                </div>
              )}
            </div>

            {state !== 'collapsed' && (
              <div className="px-2 mb-6">
                <Button className="w-full bg-gradient-primary border-0 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                  <Plus className="mr-2 h-4 w-4" /> New Post
                </Button>
              </div>
            )}

            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={`
                        h-11 rounded-xl transition-all duration-300
                        ${isActive(item.url)
                          ? 'bg-primary/10 text-primary font-medium shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]'
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                        }
                      `}
                    >
                      <NavLink to={item.url} end className="flex items-center gap-3">
                        <item.icon className={`w-[20px] h-[20px] ${isActive(item.url) ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                        <span className="text-[15px]">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-border/40 bg-transparent">
          <div className={`flex items-center gap-3 ${state === 'collapsed' ? 'justify-center' : ''}`}>
            <Avatar className="w-9 h-9 border-2 border-primary/20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>TR</AvatarFallback>
            </Avatar>
            {state !== 'collapsed' && (
              <div className="flex flex-col text-sm animate-in fade-in slide-in-from-left-2">
                <span className="font-medium">Trey Rogers</span>
                <span className="text-xs text-muted-foreground">trey@example.com</span>
              </div>
            )}
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}

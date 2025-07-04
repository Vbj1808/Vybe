import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  SunMoonIcon,
} from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"

interface Props {
  projectId: string
}

export const ProjectHeader = ({ projectId }: Props) => {
  const trpc = useTRPC()
  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  )
  const { setTheme, theme } = useTheme()

  return (
    <header className="p-2 flex justify-between items-center border-b">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium focus-visible:ring-0 hover:bg-muted/20 transition"
          >
            <Image src="/logo.svg" alt="Vybe" width={18} height={18} />
            <span>{project.name}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-52 rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          side="bottom"
          align="start"
        >
          <DropdownMenuItem asChild>
            <Link
              href="/"
              className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted/30 rounded-md"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted/30 rounded-md">
              <SunMoonIcon className="w-4 h-4 text-muted-foreground" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-popover border rounded-md p-1 shadow-lg">
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem
                    value="light"
                    className="px-2 py-1.5 text-sm rounded hover:bg-muted/30"
                  >
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="dark"
                    className="px-2 py-1.5 text-sm rounded hover:bg-muted/30"
                  >
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="system"
                    className="px-2 py-1.5 text-sm rounded hover:bg-muted/30"
                  >
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

import { AppBox } from "@/component/Base";
import { MenuItem } from "@/types";
import { Box, Container } from "@mui/material";
import SideBar from "./SideBar";
import DocumentIcon from "@/icons/DocumentIcon";

export function Main({ children }: any) {
  const menu = [
    {
      title: "Component",
      isSub: true,
      subItem: [
        {
          title: "Home",
          url: "/home",
          icon: <DocumentIcon />,
        },
        {
          title: "Animation",
          url: "/animation",
          icon: <DocumentIcon />,
        },
        {
          title: "Example",
          url: "/example",
          icon: <DocumentIcon />,
        },
        {
          title: "Slider",
          url: "/slider",
          icon: <DocumentIcon />,
        },
        {
          title: "Accordion",
          url: "/accordion",
          icon: <DocumentIcon />,
        },
        {
          title: "Grid",
          url: "/grid",
          icon: <DocumentIcon />,
        },
        {
          title: "Date",
          url: "/date",
          icon: <DocumentIcon />,
        },
        {
          title: "List debounce",
          url: "/list-debounce",
          icon: <DocumentIcon />,
        },
      ],
    },
    {
      title: "Hooks",
      isSub: true,
      subItem: [
        {
          title: "useTransition",
          url: "/transition",
          icon: <DocumentIcon />,
        },
      ],
    },
    {
      title: "Lib",
      isSub: true,
      subItem: [
        {
          title: "React query",
          url: "/react-query",
          icon: <DocumentIcon />,
        },
        {
          title: "SWR",
          url: "/swr",
          icon: <DocumentIcon />,
        },
      ],
    },
  ] as MenuItem[];
  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", minHeight: "calc(100vh)" }}
    >
      <Box flex={1}>{children}</Box>
      <SideBar menu={menu} />
    </Container>
  );
}

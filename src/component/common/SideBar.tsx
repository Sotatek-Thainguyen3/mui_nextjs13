import ExpandLessIcon from "@/icons/ExpandLessIcon";
import ExpandMoreIcon from "@/icons/ExpandMoreIcon";
import StarIcon from "@/icons/StarIcon";
import { MenuItem } from "@/types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ReactNode, useState } from "react";
import Link from "next/link";
import ChevronLeftIcon from "@/icons/ChevronLeftIcon";
import { useToggle } from "@/hooks/useToggle";
import Typography from "@mui/material/Typography";

interface MenuItemWrapperProps {
  open: boolean;
}
export const MenuItemWrapper = ({ open }: MenuItemWrapperProps) => {
  const [openWrapper, setOpenWrapper] = useState(open);
  const handleClick = () => {
    setOpenWrapper((prev) => !prev);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {openWrapper ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={openWrapper} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

interface SideBarProps {
  menu: MenuItem[];
}
const SideBar = ({ menu }: SideBarProps) => {
  return (
    <WrapperSideBar>
      <Box position="sticky" top={0}>
        {menu.map((item, index) => {
          if (item.isSub) {
            return (
              <List
                key={item.url || "" + index}
                sx={{
                  width: "100%",
                  bgcolor: "inherit",
                }}
                component="nav"
                subheader={
                  <Typography p=".5rem 1rem" color="gray">
                    {item?.title}
                  </Typography>
                }
              >
                {item.subItem && item.subItem.length > 0
                  ? item.subItem.map((sub, index) => {
                      return (
                        <ListItemButton
                          key={index}
                          component={Link}
                          href={sub?.url || ""}
                        >
                          <ListItemIcon>{sub?.icon}</ListItemIcon>
                          <ListItemText primary={sub?.title} />
                        </ListItemButton>
                      );
                    })
                  : null}
              </List>
            );
          } else {
            return (
              <ListItemButton key={item.url || ""}>
                <ListItemIcon>{item?.icon}</ListItemIcon>
                <ListItemText primary={item?.title} />
              </ListItemButton>
            );
          }
        })}
      </Box>
    </WrapperSideBar>
  );
};

export default SideBar;

const WrapperSideBar = ({ children }: { children: ReactNode }) => {
  const [collapse, setCollapse] = useToggle(false);
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        borderLeft: "1px solid #80808047",
        position: "relative",
        transition: ".5s ease",
        ...(collapse
          ? {
              width: "20px",
            }
          : {
              width: "260px",
            }),
      }}
    >
      <Box sx={{ position: "sticky", top: 0 }}>
        <Box
          sx={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            top: "2rem",
            left: 0,
            position: "absolute",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            boxShadow: "0px 0px 4px gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            cursor: "pointer",
          }}
          onClick={setCollapse}
        >
          <ChevronLeftIcon
            sx={{
              width: "14px",
              height: "14px",
              transform: `rotate(${collapse ? "0deg" : "180deg"})`,
            }}
          />
        </Box>
        <Box visibility={collapse ? "collapse" : "unset"}>{children}</Box>
      </Box>
    </Box>
  );
};

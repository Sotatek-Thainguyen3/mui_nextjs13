import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const SwitchLocale = () => {
  const pathname = usePathname();
  const route = useRouter();
  const pathnameParsed = pathname.split("/");
  const [localeSelected, setLocaleSelected] = useState(pathnameParsed[1]);

  const listLocaleSupport = [
    {
      name: "En",
      value: "en",
      iconUrl: "/images/flag_american.png",
    },
    {
      name: "Vi",
      value: "vi",
      iconUrl: "/images/flag_vn.png",
    },
  ];

  const handleSwitchLocale = (value: string) => {
    setLocaleSelected(value);
    pathnameParsed.splice(1, 1, value);
    route.push(pathnameParsed.join("/"));
  };

  return (
    <TextField
      select
      value={localeSelected}
      onChange={(e) => handleSwitchLocale(e.target.value)}
      size="small"
      variant="outlined"
      SelectProps={{
        sx: {
          color: "white",
          "& fieldset": {
            border: "unset",
          },
          "& .MuiSvgIcon-root": {
            color: "inherit",
          },
        },
      }}
    >
      {listLocaleSupport.map((item, index) => {
        return (
          <MenuItem key={index} value={item.value} className="abccccc">
            {item.name}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SwitchLocale;

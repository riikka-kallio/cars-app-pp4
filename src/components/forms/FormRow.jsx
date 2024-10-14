/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";

export default function FormRow({ children, halign="left" }) {
  return <Box sx={{ display: "flex", gap: 1, marginBlockEnd: 3, justifyContent: halign }}>{children}</Box>;
}
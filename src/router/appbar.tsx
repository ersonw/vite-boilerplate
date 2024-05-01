import {AdminPanelSettingsOutlined, HomeOutlined, SvgIconComponent, SwitchAccountOutlined} from "@mui/icons-material";

export interface AppbarRouter {
    path: string;
    icon: SvgIconComponent;
}
const barRouter: Array<AppbarRouter> = [
    {
        path: "/",
        icon: HomeOutlined,
    },
    {
        path: "/guard",
        icon: AdminPanelSettingsOutlined,
    },
    {
        path: "/my",
        icon: SwitchAccountOutlined,
    },
]
export default barRouter;
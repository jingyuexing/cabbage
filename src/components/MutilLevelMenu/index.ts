import MenuItem from "./MenuItem.vue"
import SubMenu from "./SubMenu.vue"
import MultiLevelMenu from "./index.vue"


export interface MenuItemsProps {
    title?:string,
    children:MenuItemsProps[]
}

export interface MultiLevelMenuProps {
    items:MenuItemsProps[]
}

export interface SubMenuProps {
    title:string
    icon:string
}

export interface MenuProps {
    items:MenuItemsProps[],
    direction:"col"|"row"
}
export {
    MenuItem,
    SubMenu,
    MultiLevelMenu
}
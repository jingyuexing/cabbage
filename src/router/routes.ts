import { RouteRecordRaw } from "vue-router"

const metas = import.meta.glob("../views/**/meta.ts", { eager: true, import: "default" })
const components = import.meta.glob("../views/**/index.vue")
function generatorRouterConfig(config: {
    meta: Record<string, any>,
    component: Record<string, any>
}): RouteRecordRaw[] {
    const { meta, component } = config
    let _routes: RouteRecordRaw[] = []
    Object.entries(meta).map(([_path, _meta]) => {
        let _paths = _path.replace("../views", "").replace("/meta.ts", "")
        _paths = _paths || "/"
        const name = _paths.split("/").filter(Boolean).join("-")
        if (!_routes.filter((value) => value.name === name).length) {
            _routes.push({
                path: ["home", "index"].includes(name) ? "/" : _paths,
                name,
                component: component[_path.replace("meta.ts", "index.vue")],
                meta: _meta,
                children: [],
            }) 
        } else {
            // _routes.reduce((pre,cur)=>{
            //     if(cur.name)
            // },{})
        }
    })
    return _routes
}
const routes = generatorRouterConfig({ meta: metas, component: components })
export {
    routes
}
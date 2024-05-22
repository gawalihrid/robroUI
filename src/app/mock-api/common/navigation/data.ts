/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        subtitle: 'Unique dashboard designs',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/dashboard',
        children: [
            {
                id   : 'dashboards.project',
                title: 'Capex Dashboard',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : 'dashboard'
            },
           
        ]
    },

    {
        id      : 'user',
        title   : 'User',
        subtitle: 'Create New Users',
        type    : 'basic',
        icon    : 'mat_outline:supervised_user_circle',
        link    : 'app-user',
        children: [
            {
                id   : 'Master.user',
                title: 'User Create',
                type : 'basic',
                icon : 'heroicons_solid:users',
                link : 'app-user'
            },
           
           
        ]
    },
    {
        id      : 'image-capture',
        title   : 'Image Capture',
        subtitle: 'Used to capture images',
        type    : 'basic',
        icon    : 'mat_outline:image',
        link    : 'app-imagecapture',
        children: [
            {
                id   : 'Master.user',
                title: 'User Create',
                type : 'basic',
                icon : 'heroicons_solid:users',
                link : 'app-imagecapture'
            },
           
           
        ]
    },
    {
        id      : 'sampleone',
        title   : 'Sample One Component',
        subtitle: 'For Authentication Sample ',
        type    : 'basic',
        icon    : 'mat_outline:app_registration',
        link    : 'app-sampleone',
        
    },
    {
        id      : 'sampletwo',
        title   : 'Sample two Component',
        subtitle: 'For Authentication Sample',
        type    : 'basic',
        icon    : 'mat_outline:auto_awesome_mosaic',
        link    : 'app-sampletwo',
        
    },
    



];

if (sessionStorage['loggedInUser'] != undefined || sessionStorage['loggedInUser'] != null) {
    var session = JSON.parse(sessionStorage['loggedInUser'])


    if (session['userRoleMap']['obj_module'] != undefined || session['userRoleMap']['obj_module'] != null) {
        var module_link = []
        for (let module of session['userRoleMap']['obj_module']) {
            if (!module_link.includes(module.module_path)) {
                module_link.push(module.module_path)
            }
        }



        for (let links of defaultNavigation) {
            if (links['children']) {
                for (let i = 0; i <= links['children'].length - 1; i++) {

                    if (!module_link.includes(links['children'][i]['link'].replace('/', ''))) {
                        let linkIndex = links['children'].findIndex((x) => x.link == links['children'][i]['link'].replace('/', ''))


                        if (linkIndex >= 0) {

                            links['children'][i]['link'] = "NA"
                        }

                    }
                }


            } else {

                if (!module_link.includes(links['link'].replace('/', ''))) {
                    links['link'] = "NA"
                }
                else {

                }

            }

        };
        
        for (let items of defaultNavigation) {
            if (items['children']) {
                let data = items['children'].filter((x: any) => x.link == 'NA')

                for (let test of data) {

                    let removeIndex = items['children'].findIndex((x) => x.id == test.id)
                    if (removeIndex >= 0) {
                        items['children'].splice(removeIndex, 1)
                    }

                }

            } else {

            }
        }

        for (let items of defaultNavigation) {
            if (!items['children'] && items.link == "NA") {
                let removeIndex = defaultNavigation.findIndex((x) => x.id == items.id)
                if (removeIndex >= 0) {
                    defaultNavigation.splice(removeIndex, 1)
                }
            }
        }
        let removeNA = defaultNavigation.findIndex((x) => !x.children && x.link == "NA")
        if (removeNA >= 0) {
            defaultNavigation.splice(removeNA, 1)
        }

        let childrenData = defaultNavigation.filter((x: any) => x.children && x.children.length == 0)

        for (let obj of childrenData) {
            let removeIndex = defaultNavigation.findIndex((x) => x.id == obj.id)
            if (removeIndex >= 0) {
                defaultNavigation.splice(removeIndex, 1)
            }

        }


       


    }
}

export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        tooltip : 'Dashboards',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
        // children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'module',
        title   : 'Module',
        tooltip : 'Module',
        type    : 'aside',
        icon    : 'mat_outline:account_tree',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id      : 'apps',
    //     title   : 'Apps',
    //     tooltip : 'Apps',
    //     type    : 'aside',
    //     icon    : 'heroicons_outline:qrcode',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id      : 'pages',
    //     title   : 'Pages',
    //     tooltip : 'Pages',
    //     type    : 'aside',
    //     icon    : 'heroicons_outline:document-duplicate',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id      : 'user-interface',
    //     title   : 'UI',
    //     tooltip : 'UI',
    //     type    : 'aside',
    //     icon    : 'heroicons_outline:collection',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id      : 'navigation-features',
    //     title   : 'Navigation',
    //     tooltip : 'Navigation',
    //     type    : 'aside',
    //     icon    : 'heroicons_outline:menu',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id      : 'Master',
        title   : 'Navigation',
        tooltip : 'Masters',
        type    : 'aside',
        icon    : 'heroicons_outline:view-list',
        children: []
    }
    
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'DASHBOARDS',
        type    : 'group',
        // children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'apps',
        title   : 'APPS',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id   : 'others',
        title: 'OTHERS',
        type : 'group'
    },
    {
        id      : 'pages',
        title   : 'Pages',
        type    : 'aside',
        icon    : 'heroicons_outline:document-duplicate',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'user-interface',
        title   : 'User Interface',
        type    : 'aside',
        icon    : 'heroicons_outline:collection',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'navigation-features',
        title   : 'Navigation Features',
        type    : 'aside',
        icon    : 'heroicons_outline:menu',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'Master',
        title   : 'Master',
        subtitle: 'Unique dashboard designs',
        type    : 'basic',
        icon    : 'heroicons_outline:view-list',
        children: []
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        // children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'apps',
        title   : 'Apps',
        type    : 'group',
        icon    : 'heroicons_outline:qrcode',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'pages',
        title   : 'Pages',
        type    : 'group',
        icon    : 'heroicons_outline:document-duplicate',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'user-interface',
        title   : 'UI',
        type    : 'group',
        icon    : 'heroicons_outline:collection',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'navigation-features',
        title   : 'Misc',
        type    : 'group',
        icon    : 'heroicons_outline:menu',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'Master',
        title   : 'Master',
        subtitle: 'Unique dashboard designs',
        type    : 'basic',
        icon    : 'heroicons_outline:view-list',
        children: []
    }
];

const PagesList = [
    {
        title: "Dashboard",
        page: "/",
        icon: 'home'
    },
    {
        title: "Vehicles",
        page: "/Vehicles",
        icon: 'directions_car',
        categories: [
            {
                categoryTitle: 'List',
                categoryPage: 'List',
                categoryImage: 'list',
            },
            {
                categoryTitle: 'Categories',
                categoryImage: 'dataset',
            },
            {
                categoryTitle: 'Insurances',
                categoryImage: 'assured_workload',
            },
        ]
    },
    {
        title: "Rentals",
        page: "/Rentals",
        icon: 'partner_exchange',
        categories: [
            {
                categoryTitle: 'List',
                categoryImage: 'List',
            },
            {
                categoryTitle: 'Deposits',
                categoryImage: 'paid',
            },
            {
                categoryTitle: 'Invoices',
                categoryImage: 'demography',
            },
            {
                categoryTitle: 'Payments',
                categoryImage: 'Payments',
            },
        ]
    },
    {
        title: "Customers",
        page: "/Customers",
        icon: 'group',
        categories: [
            {
                categoryTitle: 'List',
                categoryImage: 'List',
            },
            {
                categoryTitle: 'Warnings',
                categoryImage: 'notification_important',
            },
        ]
    },
    {
        title: "Services",
        page: "/Services",
        icon: 'settings_b_roll',
        categories: [
            {
                categoryTitle: 'List',
                categoryImage: 'List',
            },
            {
                categoryTitle: 'Vehicles',
                categoryPage: 'Vehicles',
                categoryImage: 'settings',
            },
            {
                categoryTitle: 'Fuelings',
                categoryImage: 'local_gas_station',
            },
        ]
    },
];

export default PagesList;
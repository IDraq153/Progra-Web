# REPASO EVALUACION 1 DE PROGRAMACION WEB

Las partes mas importantes de nuestra estructura de pagina web son 2: website/ admin/

-- En admin esta todo lo relacionado a la administracion de nuestras tablas fuertes de nuestra bd

-- En website estan como los planos para la vista pu

    Views en este lugar tenemos nuestros layouts / partials esqueleto de nuestra web son las plantillas dinamicas con ejs

    res.render('website/home', { title: 'Crear cuenta :)' })

    Lo que hace esa instrucción es decirle a Express: "Ve directamente a la carpeta views, busca adentro de la carpeta website el archivo llamado home.ejs, inyéctale la variable title y convierte todo eso en un HTML final para enviárselo al navegador del usuario".
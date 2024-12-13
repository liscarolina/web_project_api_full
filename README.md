# Tripleten web_project_api_full

Around es el proyecto final full stack del programa de desarrollo web de Tripleten.
Tiene dos partes backend y frontend. Ambas almacenadas en un servidor VM de google cloud.

# FRONTEND

El frontend fue desarrollado con vite-project y tecnología react. Es una plataforma de social media cuyas funcionalidades permiten a los usuarios interactuar entre sí. De esta manera,pueden:

-Crear su usuario y personalizar foto de perfil, nombre y ocupación.
-Subir fotos de lugares y almacenarlas en su perfil.
-Eliminar sus fotos. Para seguridad del usuario se ha incluído un popup de confirmación, que se activa cuando el usuario le da click al botón de eliminar. De esta manera, evitamos que se elimine contenido involuntariamente.  
-Tener acceso a las fotos que suben los otros usuarios y darles like.

# BACKEND

El backend fue desarrollado con express. Es una api, que almacena la información de los usuarios, que se carga en el frontend.

El servidor cuenta con una base no relacional gestionada por moongose y está alojado en google cloud. Se utilizó nginx como servidor proxy y para que el frontend esté siempre disponible se untilizó PM2.
Es importante señalar que las URLs cuentan con certificación https obtenida mediante el servicio gratuito de certbot.

# ACCESO A LOS RECURSOS

# Frontend: https://lis.streetwidecollectionservices.com/

# Servidor: https://api.lis.streetwidecollectionservices.com/

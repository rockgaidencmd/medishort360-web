# Instalación desde la página web

Rama de preparación: medishorts360-freemium-2026. No modificar main durante la revisión.

La sección #instalar tiene dos accesos: Dosis y Goteo IV, y Vademécum. Se habilitan al completar install-links.json con las URL HTTPS definitivas de las versiones nuevas. No se han reutilizado direcciones del Vademécum antiguo, porque no está comprobado que correspondan a PS-VADEMECUM-.

1. Desplegar cada app en Vercel desde su rama medishorts360-freemium-2026, primero en Preview. Framework Other, raíz ./, sin compilación.
2. Verificar inicio, tres usos, bloqueo del cuarto e instalación. Conservar el dominio definitivo después del lanzamiento, porque el acceso local depende del origen y navegador.
3. Configurar las dos URL en install-links.json y probar los botones. Cada botón abre la app y allí se solicita instalar; una página no instala directamente una app de otro dominio.
4. Revisar la página en móvil y publicar solo después de comprobar los destinos. La configuración sin URL deja botones Próximamente para evitar enviar usuarios a una aplicación distinta.

Las apps son PWA; no se entrega APK ni archivo ejecutable. Safari: Compartir → Añadir a pantalla de inicio. Chrome/Edge: Instalar aplicación. Primera carga y activación requieren conexión. No borrar datos del navegador si se quiere conservar la activación local.

Pendiente de negocio antes de publicar: la página anterior anuncia otros precios y paquetes. Confirmar el catálogo completo antes de mezclar la promoción de las apps independientes ($1 X3 y $2 Vademécum) con la App Maestra y sus paquetes. No se han modificado los precios ni las condiciones de los otros productos.

Pendiente técnico: reforzar contador/licencia en servidor y revisar reglas de Firebase antes de tratar el bloqueo como protección de pago. Las pruebas funcionales locales no sustituyen esa revisión.

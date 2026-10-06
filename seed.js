/**
 * QA Nexus - Seed Data Configuración
 * 
 * Este archivo contiene el estado inicial de la aplicación.
 * Modifica los arreglos vacíos a continuación para agregar tus propios datos de prueba.
 */

const appState = {
    /**
     * PROYECTOS
     * Cada objeto de proyecto requiere la siguiente estructura:
     * {
     *   id: string,       // Identificador único (ej. 'p1')
     *   name: string,     // Nombre del proyecto (ej. 'API de Pagos')
     *   status: string,   // 'active' (Aplica estilo verde) o 'maintenance' (Estilo gris)
     *   progress: number, // Porcentaje de 0 a 100 para la barra de progreso
     *   bugs: number,     // Cantidad de bugs abiertos (si > 20 se pinta de rojo)
     *   team: number      // Cantidad de QAs en el equipo
     * }
     */
    projects: [
        // Agrega tus proyectos aquí...
    ],

    /**
     * TAREAS KANBAN
     * Cada incidencia en el tablero requiere la siguiente estructura:
     * {
     *   id: string,        // Identificador único (ej. 't1')
     *   title: string,     // Título corto descriptivo
     *   projectId: string, // ID del proyecto al que pertenece (debe coincidir con uno de arriba)
     *   status: string,    // Columna: 'todo' (Por hacer), 'inprogress' (En curso) o 'done' (Hecho)
     *   priority: string,  // Importancia: 'low' (gris), 'medium' (amarillo), 'high' (naranja), 'critical' (rojo)
     *   type: string       // Tipo de ítem: 'bug' (bicho rojo), 'feature' (rayo azul), 'task' (check gris)
     * }
     */
    kanbanTasks: [
        // Agrega tus incidencias Kanban aquí...
    ],

    /**
     * CASOS DE PRUEBA (TEST CASES)
     * Cada caso de prueba requiere la siguiente estructura:
     * {
     *   id: string,        // Identificador oficial (ej. 'TC-105')
     *   title: string,     // Título o descripción del escenario a probar
     *   projectId: string, // ID del proyecto al que pertenece
     *   priority: string,  // Importancia: 'low', 'medium', 'high', 'critical'
     *   status: string     // Resultado: 'passed' (aprobado), 'failed' (fallido), 'pending' (pendiente)
     * }
     */
    testCases: [
        // Agrega tus casos de prueba aquí...
    ],

    /**
     * MÉTRICAS DEL DASHBOARD
     * Estadísticas globales calculadas (pueden ser valores fijos para demostración)
     * {
     *   totalTests: number,     // Total de ejecuciones (cualquier número entero)
     *   passedRate: number,     // Porcentaje de éxito (0-100)
     *   openBugs: number,       // Cantidad total de bugs abiertos inter-proyecto
     *   activeProjects: number  // Total de proyectos en curso
     * }
     */
    metrics: {
        totalTests: 0,
        passedRate: 0,
        openBugs: 0,
        activeProjects: 0
    }
};

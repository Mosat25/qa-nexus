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
        { id: 'p1', name: 'E-Commerce Platform', status: 'active', progress: 75, bugs: 12, team: 4 },
        { id: 'p2', name: 'Mobile App Redesign', status: 'active', progress: 45, bugs: 28, team: 3 },
        { id: 'p3', name: 'Payment Gateway API', status: 'maintenance', progress: 100, bugs: 2, team: 1 },
        { id: 'p4', name: 'User Dashboard', status: 'active', progress: 90, bugs: 5, team: 2 }
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
        { id: 'TASK-101', title: 'Fix checkout crash on iOS', projectId: 'p2', status: 'inprogress', priority: 'critical', type: 'bug' },
        { id: 'TASK-102', title: 'Add Apple Pay support', projectId: 'p3', status: 'done', priority: 'high', type: 'feature' },
        { id: 'TASK-103', title: 'Test new search filters', projectId: 'p1', status: 'todo', priority: 'medium', type: 'task' },
        { id: 'TASK-104', title: 'Update user profile UI', projectId: 'p4', status: 'inprogress', priority: 'low', type: 'feature' },
        { id: 'TASK-105', title: 'Verify password reset email', projectId: 'p1', status: 'done', priority: 'high', type: 'task' },
        { id: 'TASK-106', title: 'Image upload failing', projectId: 'p2', status: 'todo', priority: 'high', type: 'bug' }
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
        { id: 'TC-001', title: 'Login with valid credentials', projectId: 'p4', priority: 'critical', status: 'passed' },
        { id: 'TC-002', title: 'Checkout with empty cart', projectId: 'p1', priority: 'medium', status: 'failed' },
        { id: 'TC-003', title: 'Process refund API', projectId: 'p3', priority: 'high', status: 'pending' },
        { id: 'TC-004', title: 'Upload avatar > 5MB', projectId: 'p2', priority: 'low', status: 'passed' },
        { id: 'TC-005', title: 'Search returns max 50 items', projectId: 'p1', priority: 'medium', status: 'passed' }
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
        totalTests: 1245,
        passedRate: 88,
        openBugs: 47,
        activeProjects: 3
    }
};

/**
 * QA Nexus - App Logic
 * Modular approach using ES6+, array methods, and functional rendering.
 */

// appState is now loaded globally from seed.js

// --- CORE NAVIGATION & INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    loadLocalIcons();

    // Setup Navigation
    setupNavigation();

    // Initial Renders
    renderDashboard();
    renderProjects();
    renderKanban();
    renderTestCases();

    // Setup Event Listeners for Filters/Export
    setupEventListeners();
});

/**
 * Navigation Logic
 * Toggles visibility of sections based on data-target attribute
 */
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('main > div > section');
    const titleEl = document.getElementById('current-section-title');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.getAttribute('data-target');
            const sectionName = btn.innerText.trim();

            // Update Title
            titleEl.textContent = sectionName;

            // Update Buttons State
            navButtons.forEach(b => {
                b.classList.remove('bg-blue-600/10', 'text-blue-400', 'font-medium');
                b.classList.add('text-slate-400');
            });
            btn.classList.add('bg-blue-600/10', 'text-blue-400', 'font-medium');
            btn.classList.remove('text-slate-400');

            // Toggle Sections
            sections.forEach(sec => {
                if (sec.id === targetId) {
                    sec.classList.remove('hidden');
                    sec.classList.add('flex', targetId === 'kanban' ? 'flex-col' : 'block'); // specific display types
                    if (targetId !== 'kanban') sec.classList.remove('flex', 'flex-col'); // reset if not kanban
                } else {
                    sec.classList.add('hidden');
                    sec.classList.remove('flex', 'flex-col', 'block');
                }
            });

            // Re-render icons if needed when unhidden (mostly handled by lucide, but good practice if dynamcly injected)
            loadLocalIcons();
        });
    });
}

// --- MODULE: DASHBOARD ---
function renderDashboard() {
    // 1. Render Metrics using appState.metrics
    const metricsContainer = document.getElementById('dashboard-metrics');

    // Array approach for metrics to use Map
    const metricCards = [
        { label: 'Total Executions (30d)', value: appState.metrics.totalTests, icon: 'activity', color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Pass Rate', value: `${appState.metrics.passedRate}%`, icon: 'check-circle', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { label: 'Open Bugs', value: appState.metrics.openBugs, icon: 'bug', color: 'text-red-400', bg: 'bg-red-400/10' },
        { label: 'Active Projects', value: appState.metrics.activeProjects, icon: 'folder', color: 'text-purple-400', bg: 'bg-purple-400/10' }
    ];

    metricsContainer.innerHTML = metricCards.map(m => `
        <div class="bg-slate-800 rounded-xl border border-slate-700 p-5 flex items-center gap-4 shadow-sm hover:border-slate-600 transition-colors">
            <div class="w-12 h-12 rounded-lg ${m.bg} flex items-center justify-center flex-shrink-0">
                <i data-icon="${m.icon}" class="w-6 h-6 ${m.color}"></i>
            </div>
            <div>
                <p class="text-sm text-slate-400 font-medium">${m.label}</p>
                <p class="text-2xl font-bold text-white mt-1">${m.value}</p>
            </div>
        </div>
    `).join('');

    // 2. Render Recent Activity (Mocked using map/reduce concept)
    const activityContainer = document.getElementById('dashboard-activity');
    // Synthesize activity from task state changes
    const activities = [
        { user: 'Ana', action: 'reported a bug', target: 'Login Validation Error', time: '10 min ago', type: 'bug' },
        { user: 'Carlos', action: 'moved test case to passed', target: 'TC-001', time: '1 hr ago', type: 'success' },
        { user: 'QA Auto', action: 'completed regression suite', target: 'E-commerce API', time: '3 hrs ago', type: 'info' }
    ];

    activityContainer.innerHTML = activities.map(act => `
        <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                ${act.user.charAt(0)}
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm text-slate-300">
                    <span class="font-semibold text-white">${act.user}</span> ${act.action}
                    <span class="font-medium text-blue-400">${act.target}</span>
                </p>
                <p class="text-xs text-slate-500 mt-0.5">${act.time}</p>
            </div>
        </div>
    `).join('');
}

// --- MODULE: PROJECTS ---
function renderProjects(searchTerm = '') {
    const container = document.getElementById('projects-grid');

    // Filter projects based on search
    const filteredProjects = appState.projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    container.innerHTML = filteredProjects.map(p => `
        <div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-900/20 group">
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">${p.name}</h3>
                    <span class="px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${p.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
            'bg-slate-700 text-slate-300 border border-slate-600'
        }">${p.status}</span>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-slate-400">Progreso</span>
                            <span class="text-slate-200 font-medium">${p.progress}%</span>
                        </div>
                        <div class="w-full bg-slate-700 rounded-full h-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: ${p.progress}%"></div>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 pt-2 border-t border-slate-700">
                        <div class="flex items-center gap-1.5 text-sm text-slate-400">
                            <i data-icon="bug" class="w-4 h-4 ${p.bugs > 20 ? 'text-red-400' : ''}"></i>
                            <span class="${p.bugs > 20 ? 'text-red-400 font-medium' : ''}">${p.bugs} Bugs Open</span>
                        </div>
                        <div class="flex items-center gap-1.5 text-sm text-slate-400">
                            <i data-icon="users" class="w-4 h-4"></i>
                            <span>${p.team} QAs</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-slate-900/50 px-6 py-3 border-t border-slate-700 flex justify-end">
                <button class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1">
                    Ver Detalles <i data-icon="arrow-right" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `).join('');
    loadLocalIcons();
}

// --- MODULE: KANBAN ---
function renderKanban(projectId = 'all') {
    const board = document.getElementById('kanban-board');

    const columns = [
        { id: 'todo', title: 'To Do', color: 'border-slate-500' },
        { id: 'inprogress', title: 'In Progress', color: 'border-blue-500' },
        { id: 'done', title: 'Done', color: 'border-emerald-500' }
    ];

    // Filter tasks by project if selected using filter()
    const tasksToRender = projectId === 'all'
        ? appState.kanbanTasks
        : appState.kanbanTasks.filter(t => t.projectId === projectId);

    // Group tasks by status using reduce()
    const tasksByStatus = tasksToRender.reduce((acc, task) => {
        if (!acc[task.status]) acc[task.status] = [];
        acc[task.status].push(task);
        return acc;
    }, { todo: [], inprogress: [], done: [] }); // Initialize defaults

    board.innerHTML = columns.map(col => `
        <div class="w-80 flex-shrink-0 flex flex-col bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
            <div class="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center border-t-2 ${col.color}">
                <h3 class="font-medium text-slate-200">${col.title}</h3>
                <span class="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full font-bold">
                    ${tasksByStatus[col.id].length}
                </span>
            </div>
            <div class="p-3 flex-1 overflow-y-auto space-y-3 kanban-column-content min-h-[50vh]">
                ${tasksByStatus[col.id].map(task => renderKanbanCard(task)).join('')}
            </div>
        </div>
    `).join('');

    loadLocalIcons();
}

function renderKanbanCard(task) {
    const priorityColors = {
        low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        critical: 'bg-red-500/10 text-red-500 border-red-500/20'
    };

    const typeIcons = {
        bug: '<i data-icon="bug" class="w-3.5 h-3.5 text-red-400"></i>',
        feature: '<i data-icon="zap" class="w-3.5 h-3.5 text-blue-400"></i>',
        task: '<i data-icon="check-square" class="w-3.5 h-3.5 text-slate-400"></i>'
    };

    const projectName = appState.projects.find(p => p.id === task.projectId)?.name || 'Unknown';

    return `
        <div class="bg-slate-800 border border-slate-700 p-4 rounded-lg shadow-sm hover:border-blue-500/50 transition-colors cursor-grab group">
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-semibold px-2 py-0.5 rounded border uppercase flex items-center gap-1 ${priorityColors[task.priority]}">
                    ${task.priority}
                </span>
                ${typeIcons[task.type] || ''}
            </div>
            <h4 class="text-sm font-medium text-slate-200 leading-snug mb-3 group-hover:text-blue-400 transition-colors">${task.title}</h4>
            <div class="flex justify-between items-center mt-auto text-xs text-slate-500">
                <span class="bg-slate-900 px-2 py-1 rounded truncate max-w-[120px]" title="${projectName}">${projectName}</span>
                <span class="font-mono">${task.id}</span>
            </div>
        </div>
    `;
}

// --- MODULE: TEST CASES ---
function renderTestCases() {
    const tbody = document.getElementById('tc-table-body');
    const emptyState = document.getElementById('tc-empty-state');

    // Get filter states
    const searchMode = document.getElementById('tc-search').value.toLowerCase();
    const statusMode = document.getElementById('tc-status-filter').value;
    const priorityMode = document.getElementById('tc-priority-filter').value;

    // Apply multiple filters using array.filter
    const filteredTests = appState.testCases.filter(tc => {
        const matchSearch = tc.title.toLowerCase().includes(searchMode) || tc.id.toLowerCase().includes(searchMode);
        const matchStatus = statusMode === 'all' || tc.status === statusMode;
        const matchPriority = priorityMode === 'all' || tc.priority === priorityMode;
        return matchSearch && matchStatus && matchPriority;
    });

    if (filteredTests.length === 0) {
        tbody.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    const statusConfig = {
        passed: { cls: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: 'check-circle-2', label: 'Aprobado' },
        failed: { cls: 'text-red-400 bg-red-400/10 border-red-400/20', icon: 'x-circle', label: 'Fallido' },
        pending: { cls: 'text-slate-400 bg-slate-400/10 border-slate-400/20', icon: 'clock', label: 'Pendiente' }
    };

    const prioConfig = {
        high: 'text-orange-400',
        critical: 'text-red-500',
        medium: 'text-yellow-400',
        low: 'text-slate-400'
    };

    tbody.innerHTML = filteredTests.map(tc => {
        const project = appState.projects.find(p => p.id === tc.projectId);
        const st = statusConfig[tc.status];

        return `
            <tr class="hover:bg-slate-800/50 transition-colors group">
                <td class="px-6 py-4">
                    <div class="font-mono text-xs text-slate-400 mb-0.5">${tc.id}</div>
                    <div class="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">${tc.title}</div>
                </td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300">
                        <i data-icon="folder" class="w-3.5 h-3.5 text-blue-400"></i>
                        ${project ? project.name : 'N/A'}
                    </span>
                </td>
                <td class="px-6 py-4 capitalize font-medium ${prioConfig[tc.priority] || 'text-slate-400'}">
                    ${tc.priority}
                </td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${st.cls}">
                        <i data-icon="${st.icon}" class="w-3.5 h-3.5"></i>
                        ${st.label}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button class="text-slate-400 hover:text-white transition-colors p-1" title="Editar">
                        <i data-icon="edit-2" class="w-4 h-4"></i>
                    </button>
                    <button class="text-slate-400 hover:text-red-400 transition-colors p-1 ml-2" title="Eliminar">
                        <i data-icon="trash-2" class="w-4 h-4"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    loadLocalIcons();
}

// --- EVENT LISTENERS FOR INTERACTIONS ---
function setupEventListeners() {
    // Projects Filter
    document.getElementById('project-search').addEventListener('input', (e) => {
        renderProjects(e.target.value);
    });

    // Populate Kanban Project Filter based on available projects (using Map)
    const kanbanFilter = document.getElementById('kanban-project-filter');
    appState.projects.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        kanbanFilter.appendChild(option);
    });

    kanbanFilter.addEventListener('change', (e) => {
        renderKanban(e.target.value);
    });

    // Test Cases Filters
    const tcFilters = ['tc-search', 'tc-status-filter', 'tc-priority-filter'];
    tcFilters.forEach(id => {
        document.getElementById(id).addEventListener('input', renderTestCases);
        document.getElementById(id).addEventListener('change', renderTestCases);
    });

    // Export JSON via Array methods
    document.getElementById('btn-export-json').addEventListener('click', () => {
        // Grab current filtered data, using map to format it
        // We re-run the filter logic here so we only export what is visible
        const searchMode = document.getElementById('tc-search').value.toLowerCase();
        const statusMode = document.getElementById('tc-status-filter').value;
        const priorityMode = document.getElementById('tc-priority-filter').value;

        const dataToExport = appState.testCases
            .filter(tc => {
                const matchSearch = tc.title.toLowerCase().includes(searchMode) || tc.id.toLowerCase().includes(searchMode);
                const matchStatus = statusMode === 'all' || tc.status === statusMode;
                const matchPriority = priorityMode === 'all' || tc.priority === priorityMode;
                return matchSearch && matchStatus && matchPriority;
            })
            // Use map to enrich data before export (e.g. resolve project ID to name)
            .map(tc => {
                const proj = appState.projects.find(p => p.id === tc.projectId);
                return {
                    id: tc.id,
                    title: tc.title,
                    project: proj ? proj.name : 'Unknown',
                    priority: tc.priority,
                    status: tc.status
                };
            });

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "qa_test_cases.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });
}

// Function to load local SVG icons from icons.js (CORS safe for file:// protocol)
function loadLocalIcons() {
    const elements = document.querySelectorAll('[data-icon]');
    for (const el of elements) {
        if (el.hasAttribute('data-icon-loaded')) continue;
        const iconName = el.getAttribute('data-icon');
        el.setAttribute('data-icon-loaded', 'true');
        try {
            if (typeof localIcons !== 'undefined' && localIcons[iconName]) {
                const svgText = localIcons[iconName];
                const wrapper = document.createElement('div');
                wrapper.innerHTML = svgText.trim();
                const svgNode = wrapper.querySelector('svg');

                if (svgNode) {
                    if (el.className) {
                        svgNode.setAttribute('class', el.className);
                    }
                    el.parentNode.replaceChild(svgNode, el);
                } else {
                    console.warn(`No SVG element found in icon: ${iconName}`);
                }
            } else {
                console.warn(`Icon not found in localIcons: ${iconName}`);
            }
        } catch (err) {
            console.error(`Error loading icon: ${iconName}`, err);
        }
    }
}

import './Bandeja.css';

export default function Bandeja() {
    return (
        <main className="app-content">
            <div className="page-container bandeja-container">
                
                {/* Cabecera superior de la vista */}
                <div className="bandeja-topbar">
                    <div>
                        <span className="text-muted-custom small">Atención &gt; Bandeja del día</span>
                        <h1 className="mb-1">Bandeja del día</h1>
                        <p className="text-muted-custom small">15/09/2026 - 12 pedidos de la jornada - 7 en cola - hora actual 11:24</p>
                    </div>
                    <div className="bandeja-actions">
                        <button className="btn btn-outline-custom">Agrupar por: estado ▼</button>
                        <button className="btn btn-danger-custom">Entregar contra código</button>
                    </div>
                </div>

                {/* Tablero Kanban */}
                <div className="kanban-board">
                    
                    {/* COLUMNA 1: RECIBIDOS */}
                    <div className="kanban-column">
                        <div className="column-header header-recibidos">
                            <span>RECIBIDOS</span>
                            <span className="badge">3</span>
                        </div>
                        
                        {/* Tarjeta de Pedido */}
                        <div className="pedido-card">
                            <div className="pedido-info">
                                <div>
                                    <h4 className="pedido-id">PED-4842</h4>
                                    <p className="pedido-details">3 items • S/ 36.00<br/>Mateo Rojas</p>
                                </div>
                                <span className="pedido-time">11:30</span>
                            </div>
                            <div className="pedido-actions">
                                <button className="btn btn-danger-custom w-100">Preparar</button>
                                <button className="btn btn-outline-danger w-50">Rechazar</button>
                            </div>
                        </div>

                        {/* Otra Tarjeta */}
                        <div className="pedido-card">
                            <div className="pedido-info">
                                <div>
                                    <h4 className="pedido-id">PED-4843</h4>
                                    <p className="pedido-details">1 item • S/ 3.50<br/>Lucía Farfán</p>
                                </div>
                                <span className="pedido-time">11:30</span>
                            </div>
                            <div className="pedido-actions">
                                <button className="btn btn-danger-custom w-100">Preparar</button>
                                <button className="btn btn-outline-danger w-50">Rechazar</button>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA 2: EN PREPARACIÓN */}
                    <div className="kanban-column column-preparacion">
                        <div className="column-header header-preparacion">
                            <span>EN PREPARACIÓN</span>
                            <span className="badge">2</span>
                        </div>
                        
                        <div className="pedido-card border-warning">
                            <div className="pedido-info">
                                <div>
                                    <h4 className="pedido-id">PED-4821</h4>
                                    <p className="pedido-details text-warning-custom">3 items • recojo 11:30<br/>Mateo Rojas • 1 nota</p>
                                </div>
                                <span className="pedido-time text-warning-custom fw-bold">en 6 min</span>
                            </div>
                            <button className="btn btn-success-custom w-100 mt-2">Marcar listo</button>
                        </div>
                    </div>

                    {/* COLUMNA 3: LISTOS */}
                    <div className="kanban-column column-listos">
                        <div className="column-header header-listos">
                            <span>LISTOS</span>
                            <span className="badge badge-light">2</span>
                        </div>
                        
                        <div className="pedido-card border-success">
                            <div className="pedido-info">
                                <div>
                                    <h4 className="pedido-id text-success-custom">PED-4835</h4>
                                    <p className="pedido-details text-success-custom">1 item • S/ 7.50<br/>Andrea Núñez</p>
                                </div>
                                <span className="pedido-time">11:00</span>
                            </div>
                            <button className="btn btn-dark-custom w-100 mt-2">Entregar</button>
                        </div>
                    </div>

                    {/* COLUMNA 4: ENTREGADOS */}
                    <div className="kanban-column column-entregados">
                        <div className="column-header header-entregados">
                            <span>ENTREGADOS</span>
                            <span className="badge">5</span>
                        </div>
                        
                        <div className="pedido-card card-disabled">
                            <div className="pedido-info">
                                <div>
                                    <h4 className="pedido-id text-muted">PED-4805</h4>
                                    <p className="pedido-details text-muted">2 items • S/ 12.50<br/>Renzo Vílchez • entregado 10:34</p>
                                </div>
                                <span className="pedido-time text-muted">10:30</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
import React from "react";
import "./SideBarEnterprise.css";

const sections = [
  {
    title: "ATENCIÓN",
    items: [
      { label: "Bandeja del día", badge: 7 },
      { label: "Entrega contra código", active: true },
      { label: "Resumen del día" },
    ],
  },
  {
    title: "CARTA",
    items: [
      { label: "Mi carta" },
      { label: "Opciones y agregados" },
      { label: "Agotados del día", badge: 3 },
    ],
  },
  {
    title: "LOCAL",
    items: [
      { label: "Perfil del local" },
      { label: "Horario de atención" },
      { label: "Reseñas" },
    ],
  },
];

export default function SideBarEnterprise() {
  return (
    <aside className="sidebar-enterprise">
      {sections.map((section) => (
        <section className="sidebar-section" key={section.title}>
          <h3 className="sidebar-section-title">{section.title}</h3>

          <nav>
            {section.items.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`sidebar-item ${
                  item.active ? "sidebar-item--active" : ""
                }`}
              >
                <span>{item.label}</span>

                {item.badge !== undefined && (
                  <span className="sidebar-badge">{item.badge}</span>
                )}
              </button>
            ))}
          </nav>
        </section>
      ))}
    </aside>
  );
}

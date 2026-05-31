import React from "react";

export default function PrepSystem() {
  return (
    <section id="system" className="studio-section">
      <p className="section-label">THE PREP SYSTEM</p>
      <h2>Three tools, one study flow.</h2>

      <div className="tool-grid">
        <div className="tool-card">
          <span>01</span>
          <h3>Practice Bank</h3>
          <p>Exam-style questions built around real prep behaviour.</p>
        </div>

        <div className="tool-card">
          <span>02</span>
          <h3>Smart Study Plan</h3>
          <p>Turn your exam date into a clear daily preparation plan.</p>
        </div>

        <div className="tool-card">
          <span>03</span>
          <h3>Peer Accountability</h3>
          <p>Stay consistent with streaks, groups, and visible progress.</p>
        </div>
      </div>
    </section>
  );
}

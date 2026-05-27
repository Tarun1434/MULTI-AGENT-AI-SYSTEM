import React from 'react'

export default function LoginModal({ open = false, onClose }) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
      <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320 }}>
        <h3>Login</h3>
        <p>Placeholder login modal.</p>
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button onClick={onClose} className="cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  )
}

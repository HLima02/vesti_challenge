import React from 'react'
import ProtectedRoute from '../components/ProtectedRouter'
export default function FinalizeOrder() {
  return (
    <ProtectedRoute>
      <div>
        <h2>Página de finalização do pedido</h2>
      </div>
    </ProtectedRoute>
  )
}

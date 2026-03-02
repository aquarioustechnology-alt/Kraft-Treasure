// Simple global state using React 19 patterns with useSyncExternalStore
type CartItem = {
  productId: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  currency: string
  isOpen: boolean
}

let state: CartState = {
  items: [],
  currency: "INR",
  isOpen: false,
}

const listeners = new Set<() => void>()

function emitChange() {
  listeners.forEach((listener) => listener())
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot() {
    return state
  },
  addItem(productId: string) {
    const existing = state.items.find((i) => i.productId === productId)
    if (existing) {
      state = {
        ...state,
        items: state.items.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      }
    } else {
      state = {
        ...state,
        items: [...state.items, { productId, quantity: 1 }],
      }
    }
    emitChange()
  },
  removeItem(productId: string) {
    state = {
      ...state,
      items: state.items.filter((i) => i.productId !== productId),
    }
    emitChange()
  },
  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      cartStore.removeItem(productId)
      return
    }
    state = {
      ...state,
      items: state.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    }
    emitChange()
  },
  setCurrency(currency: string) {
    state = { ...state, currency }
    emitChange()
  },
  toggleCart() {
    state = { ...state, isOpen: !state.isOpen }
    emitChange()
  },
  closeCart() {
    state = { ...state, isOpen: false }
    emitChange()
  },
  getItemCount() {
    return state.items.reduce((sum, i) => sum + i.quantity, 0)
  },
}

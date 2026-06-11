# Button Component

Componente React reutilizável com BEM CSS, TypeScript strict e acessibilidade completa.

![Status](https://img.shields.io/badge/status-production%20ready-green)

---

## Uso básico

```tsx
<Button variant="primary">GET IN TOUCH</Button>
<Button variant="secondary">VIEW WORK</Button>
<Button variant="ghost">LEARN MORE</Button>
```

---

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | — | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho |
| `disabled` | `boolean` | `false` | Desabilita interação |
| `aria-label` | `string` | — | Descrição acessível |
| `className` | `string` | — | BEM modifier extra |

---

## Estrutura
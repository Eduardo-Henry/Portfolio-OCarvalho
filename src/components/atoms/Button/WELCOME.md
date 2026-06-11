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
src/components/Button/
├── Button.tsx          # componente principal
├── Button.css          # estilos BEM
├── Button.types.ts     # tipos TypeScript
└── index.ts            # exports

**Documentação:** `QUICK_START.md` → `CHEAT_SHEET.md` → `COMPLETE_REFERENCE.md`

---

## O que está incluído

- Componente React reutilizável
- CSS com arquitetura BEM
- TypeScript strict
- Responsividade automática
- Acessibilidade (aria-label, focus-visible, estados claros)
- Zero erros de compilação
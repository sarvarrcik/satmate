import { FormulaItem } from '../types';

export const MATHBOOK_FORMULAS: FormulaItem[] = [
  // --- ALGEBRA FORMULAS ---
  {
    id: 'alg-slope-intercept',
    section: 'Algebra',
    topic: 'Linear Functions',
    name: 'Slope-Intercept Form',
    latex: 'y = mx + b',
    description: 'Equation of a line where $m$ is the slope ($\\frac{\\text{rise}}{\\text{run}} = \\frac{y_2 - y_1}{x_2 - x_1}$) and $b$ is the $y$-intercept (where $x=0$).',
    category: 'Linear Functions'
  },
  {
    id: 'alg-standard-solutions',
    section: 'Algebra',
    topic: 'Linear System of Equations',
    name: 'System Solutions Conditions',
    latex: '\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}',
    description: '• One solution: $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$\n• No solution (Parallel): $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$\n• Infinitely many solutions (Identical): $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$',
    category: 'Systems'
  },
  {
    id: 'alg-slope-formula',
    section: 'Algebra',
    topic: 'Linear Equations',
    name: 'Slope Formula',
    latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{rise}}{\\text{run}}',
    description: 'Calculates the rate of change between two points $(x_1, y_1)$ and $(x_2, y_2)$ in the coordinate plane.',
    category: 'Lines'
  },

  // --- ADVANCED MATH FORMULAS ---
  {
    id: 'adv-quadratic-forms',
    section: 'Advanced Math',
    topic: 'Quadratics',
    name: 'Quadratic Forms',
    latex: '\\begin{aligned} \\text{Standard:} & \\quad y = ax^2 + bx + c \\\\ \\text{Factored:} & \\quad y = a(x - x_1)(x - x_2) \\\\ \\text{Vertex:} & \\quad y = a(x - h)^2 + k \\end{aligned}',
    description: '• Standard form: $c$ is the $y$-intercept.\n• Factored form: $x_1, x_2$ are the $x$-intercepts (roots).\n• Vertex form: $(h, k)$ is the vertex coordinate.',
    category: 'Quadratics'
  },
  {
    id: 'adv-vertex-symmetry',
    section: 'Advanced Math',
    topic: 'Quadratics',
    name: 'Axis of Symmetry & Vertex',
    latex: 'x_{\\text{vertex}} = -\\frac{b}{2a}',
    description: 'The vertical line of symmetry passes through the vertex of any parabola $y = ax^2 + bx + c$.',
    category: 'Quadratics'
  },
  {
    id: 'adv-discriminant',
    section: 'Advanced Math',
    topic: 'Quadratics',
    name: 'Discriminant & Number of Solutions',
    latex: '\\Delta = b^2 - 4ac',
    description: '• $\\Delta > 0$: 2 distinct real solutions.\n• $\\Delta = 0$: 1 real solution (repeated root).\n• $\\Delta < 0$: 0 real solutions (2 complex roots).',
    category: 'Quadratics'
  },
  {
    id: 'adv-translations',
    section: 'Advanced Math',
    topic: 'Functions',
    name: 'Function Translation Rules',
    latex: 'g(x) = f(x \\pm h) \\pm k',
    description: '• $f(x + 1)$: Shift LEFT 1 unit.\n• $f(x - 1)$: Shift RIGHT 1 unit.\n• $f(x) + 1$: Shift UP 1 unit.\n• $f(x) - 1$: Shift DOWN 1 unit.',
    category: 'Transformations'
  },
  {
    id: 'adv-reflections',
    section: 'Advanced Math',
    topic: 'Functions',
    name: 'Graph Reflections',
    latex: '-f(x) \\text{ and } f(-x)',
    description: '• $-f(x)$: Reflection about the $x$-axis.\n• $f(-x)$: Reflection about the $y$-axis.',
    category: 'Transformations'
  },
  {
    id: 'adv-exponential-model',
    section: 'Advanced Math',
    topic: 'Exponential Functions',
    name: 'Exponential Growth & Decay',
    latex: 'y = a(1 \\pm r)^{\\frac{t}{k}} = a \\cdot b^t',
    description: '$a$ is initial amount ($y$-intercept), $r$ is growth/decay rate per period, $k$ is time interval per cycle.',
    category: 'Exponentials'
  },

  // --- PROBLEM SOLVING FORMULAS ---
  {
    id: 'ps-percent-change',
    section: 'Problem Solving',
    topic: 'Percent, Ratio & Proportion',
    name: 'Percent Change',
    latex: '\\text{Percent Change} = \\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100\\%',
    description: 'Calculates the relative increase or decrease from the baseline (old) value.',
    category: 'Percentages'
  },
  {
    id: 'ps-probability',
    section: 'Problem Solving',
    topic: 'Probability',
    name: 'Theoretical & Conditional Probability',
    latex: 'P(A) = \\frac{\\text{Desired Outcomes}}{\\text{Total Possible Outcomes}}, \\quad P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}',
    description: 'Conditional probability restricts the sample space strictly to condition $B$.',
    category: 'Probability'
  },
  {
    id: 'ps-stats',
    section: 'Problem Solving',
    topic: 'Mean, Median, Mode, Range',
    name: 'Summary Statistics',
    latex: '\\text{Mean} = \\frac{\\sum x_i}{n}, \\quad \\text{Range} = \\text{Max} - \\text{Min}, \\quad \\text{IQR} = Q_3 - Q_1',
    description: '• Mean: arithmetic average.\n• Median: middle value when ordered.\n• IQR: distance spanning middle 50% of data.',
    category: 'Statistics'
  },
  {
    id: 'ps-margin-of-error',
    section: 'Problem Solving',
    topic: 'Research Organizing',
    name: 'Margin of Error Rules',
    latex: '\\text{Confidence Interval} = \\hat{p} \\pm \\text{MOE}',
    description: '• Larger sample size $\\implies$ MOE decreases.\n• Less variability $\\implies$ MOE decreases.\n• Smaller sample size $\\implies$ MOE increases.',
    category: 'Statistics'
  },

  // --- GEOMETRY & TRIGONOMETRY FORMULAS ---
  {
    id: 'geom-pythagorean',
    section: 'Geometry & Trigonometry',
    topic: 'Triangles',
    name: 'Pythagorean Theorem',
    latex: 'a^2 + b^2 = c^2',
    description: 'In any right triangle with legs $a, b$ and hypotenuse $c$.',
    category: 'Triangles'
  },
  {
    id: 'geom-special-triangles',
    section: 'Geometry & Trigonometry',
    topic: 'Triangles',
    name: 'Special Right Triangles',
    latex: '30^\\circ-60^\\circ-90^\\circ: \\; x, x\\sqrt{3}, 2x \\qquad 45^\\circ-45^\\circ-90^\\circ: \\; s, s, s\\sqrt{2}',
    description: 'Ratios of side lengths for $30-60-90$ and $45-45-90$ triangles.',
    category: 'Triangles'
  },
  {
    id: 'geom-trig-ratios',
    section: 'Geometry & Trigonometry',
    topic: 'Trigonometry',
    name: 'SOH CAH TOA & Cofunction Identities',
    latex: '\\sin x = \\frac{\\text{Opp}}{\\text{Hyp}}, \\; \\cos x = \\frac{\\text{Adj}}{\\text{Hyp}}, \\; \\tan x = \\frac{\\text{Opp}}{\\text{Adj}}, \\; \\sin x = \\cos(90^\\circ - x)',
    description: 'Cofunction identity: $\\sin x = \\cos y$ whenever $x + y = 90^\\circ$ (or $\\frac{\\pi}{2}$ radians).',
    category: 'Trigonometry'
  },
  {
    id: 'geom-circle-equation',
    section: 'Geometry & Trigonometry',
    topic: 'Circle',
    name: 'Equation of a Circle',
    latex: '(x - h)^2 + (y - k)^2 = r^2',
    description: 'Circle with center $(h, k)$ and radius $r$.',
    category: 'Circles'
  },
  {
    id: 'geom-arc-sector',
    section: 'Geometry & Trigonometry',
    topic: 'Circle',
    name: 'Arc Length & Sector Area',
    latex: '\\text{Arc Length} = \\frac{\\theta}{360^\\circ} \\cdot 2\\pi r, \\quad \\text{Sector Area} = \\frac{\\theta}{360^\\circ} \\cdot \\pi r^2',
    description: 'Where $\\theta$ is the central angle in degrees.',
    category: 'Circles'
  },
  {
    id: 'geom-3d-volumes',
    section: 'Geometry & Trigonometry',
    topic: 'Area and Volume',
    name: '3D Geometry Volumes',
    latex: 'V_{\\text{box}} = \\ell w h, \\; V_{\\text{cyl}} = \\pi r^2 h, \\; V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3, \\; V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h',
    description: 'Volume formulas for standard 3-dimensional geometric solids.',
    category: 'Solids'
  }
];

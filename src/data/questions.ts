import { Question } from '../types';

export const MATHBOOK_QUESTIONS: Question[] = [
  // --- QUADRATICS ---
  {
    id: 'quad-0',
    section: 'Advanced Math',
    topic: 'Quadratics',
    subtopic: 'Number of Solutions & Discriminant',
    questionNumber: 0,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: 'If $ax^2 + bx + c$ is a quadratic equation where $a \\neq 0$, which of the following must be true if the equation has exactly one real solution?',
    choices: [
      { id: 'A', text: '$b^2 - 4ac > 0$' },
      { id: 'B', text: '$b^2 - 4ac = 0$' },
      { id: 'C', text: '$b^2 - 4ac < 0$' },
      { id: 'D', text: '$b^2 + 4ac = 0$' },
    ],
    correctAnswer: 'B',
    explanation: 'The number of real solutions of a quadratic equation $ax^2 + bx + c = 0$ is determined by the discriminant $\\Delta = b^2 - 4ac$. When $\\Delta > 0$, there are two distinct real solutions; when $\\Delta = 0$, there is exactly one real solution (a repeated root); and when $\\Delta < 0$, there are no real solutions.',
    hints: [
      'Think about the quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. What part under the square root determines the number of solutions?',
      'For the expression $\\pm \\sqrt{b^2 - 4ac}$ to yield only ONE unique value for $x$, what must the value inside the radical equal?',
      'If $b^2 - 4ac = 0$, then $\\sqrt{0} = 0$, giving $x = \\frac{-b \\pm 0}{2a} = \\frac{-b}{2a}$, exactly one real root.'
    ],
    difficulty: 'medium',
    sourcePage: 70,
    similarQuestionIds: ['quad-4', 'quad-39', 'quad-40']
  },
  {
    id: 'quad-1',
    section: 'Advanced Math',
    topic: 'Quadratics',
    subtopic: 'Rational Quadratic Equations',
    questionNumber: 1,
    examDate: 'September 2025',
    type: 'student_produced',
    text: '$\\frac{1}{cx} = \\frac{x}{96} + \\frac{1}{c}$\n\nIn the given equation, $c$ is a constant. If the equation has exactly one solution, what is the value of $c$?',
    choices: [],
    correctAnswer: '-24',
    explanation: 'Multiply the entire equation by $96cx$ (where $x \\neq 0$):\n$96 = cx^2 + 96x \\implies cx^2 + 96x - 96 = 0$.\nFor this quadratic to have exactly one solution, its discriminant must be zero:\n$\\Delta = (96)^2 - 4(c)(-96) = 0 \\implies 96(96 + 4c) = 0 \\implies 4c = -96 \\implies c = -24$.',
    hints: [
      'Clear the denominators by multiplying both sides by the common denominator $96cx$.',
      'Rearrange the equation into standard quadratic form $Ax^2 + Bx + C = 0$.',
      'Set the discriminant $B^2 - 4AC = 0$ to solve for $c$.'
    ],
    difficulty: 'hard',
    sourcePage: 70,
    similarQuestionIds: ['quad-0', 'quad-40']
  },
  {
    id: 'quad-2',
    section: 'Advanced Math',
    topic: 'Quadratics',
    subtopic: 'Quadratic Formula',
    questionNumber: 2,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: '$x^2 - 9x + 1 = 0$\n\nWhat is the one solution to the given equation?',
    choices: [
      { id: 'A', text: '$\\frac{9 + \\sqrt{77}}{2}$' },
      { id: 'B', text: '$\\frac{9 + \\sqrt{85}}{2}$' },
      { id: 'C', text: '$\\frac{-9 + \\sqrt{77}}{2}$' },
      { id: 'D', text: '$\\frac{-9 + \\sqrt{85}}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Using the quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ with $a = 1, b = -9, c = 1$:\n$x = \\frac{-(-9) \\pm \\sqrt{(-9)^2 - 4(1)(1)}}{2(1)} = \\frac{9 \\pm \\sqrt{81 - 4}}{2} = \\frac{9 \\pm \\sqrt{77}}{2}$. Choice A matches $\\frac{9 + \\sqrt{77}}{2}$.',
    hints: [
      'Identify the coefficients $a=1, b=-9, c=1$.',
      'Calculate the discriminant: $(-9)^2 - 4(1)(1) = 81 - 4 = 77$.',
      'Substitute into $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$.'
    ],
    difficulty: 'medium',
    sourcePage: 70,
    similarQuestionIds: ['quad-11', 'quad-20']
  },
  {
    id: 'quad-4',
    section: 'Advanced Math',
    topic: 'Quadratics',
    subtopic: 'Number of Real Solutions',
    questionNumber: 4,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: '$(x + k)^2 + 31 = 31$\n\nIn the given equation, $k$ is a constant. How many distinct real solutions does this equation have?',
    choices: [
      { id: 'A', text: 'Zero' },
      { id: 'B', text: 'Exactly one' },
      { id: 'C', text: 'Exactly two' },
      { id: 'D', text: 'Infinitely many' },
    ],
    correctAnswer: 'B',
    explanation: 'Subtract 31 from both sides:\n$(x + k)^2 = 0 \\implies x + k = 0 \\implies x = -k$.\nSince $-k$ is a single unique value, the equation has exactly one real solution.',
    hints: [
      'Subtract 31 from both sides of the equation.',
      'You get $(x + k)^2 = 0$.',
      'Taking the square root of 0 yields only 0, so $x = -k$.'
    ],
    difficulty: 'easy',
    sourcePage: 70,
    similarQuestionIds: ['quad-0', 'quad-37']
  },
  {
    id: 'quad-5',
    section: 'Advanced Math',
    topic: 'Quadratics',
    subtopic: 'Vertex and Transformations',
    questionNumber: 5,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: '$f(x) = 4x^2 + 56x + 197$\n\nThe function $g$ is defined by $g(x) = f(x + 6)$. What is the minimum value of $g(x)$?',
    choices: [
      { id: 'A', text: '$-13$' },
      { id: 'B', text: '$-7$' },
      { id: 'C', text: '$1$' },
      { id: 'D', text: '$7$' },
    ],
    correctAnswer: 'C',
    explanation: 'The transformation $g(x) = f(x + 6)$ represents a horizontal shift left by 6 units. Horizontal shifts do not change the vertical minimum value of a parabola.\nFor $f(x) = 4x^2 + 56x + 197$, the vertex occurs at $x = -\\frac{b}{2a} = -\\frac{56}{2(4)} = -7$.\n$f(-7) = 4(-7)^2 + 56(-7) + 197 = 4(49) - 392 + 197 = 196 - 392 + 197 = 1$.\nThus, the minimum value of both $f(x)$ and $g(x)$ is $1$.',
    hints: [
      'Horizontal translations $f(x+c)$ shift the graph left/right but do NOT change the minimum output ($y$-value).',
      'Find the $x$-coordinate of the vertex of $f(x)$ using $x = -\\frac{b}{2a}$.',
      'Plug $x = -7$ into $f(x)$ to find the minimum value: $4(49) - 392 + 197 = 1$.'
    ],
    difficulty: 'medium',
    sourcePage: 70,
    similarQuestionIds: ['quad-8', 'quad-18']
  },
  {
    id: 'quad-16',
    section: 'Advanced Math',
    topic: 'Quadratics',
    subtopic: 'Factoring Quadratic Expressions',
    questionNumber: 16,
    examDate: 'September 2025',
    type: 'multiple_choice',
    text: 'The expression $x^2 + kx + 14$, where $k$ is a constant, can be rewritten as $(x + n)(x + 7)$, where $n$ is a constant. What is the value of $k$?',
    choices: [
      { id: 'A', text: '2' },
      { id: 'B', text: '5' },
      { id: 'C', text: '9' },
      { id: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation: 'Expanding $(x + n)(x + 7) = x^2 + (n + 7)x + 7n$.\nMatching coefficients with $x^2 + kx + 14$:\n$7n = 14 \\implies n = 2$.\nThen $k = n + 7 = 2 + 7 = 9$.',
    hints: [
      'Expand the product $(x + n)(x + 7)$.',
      'Equate constant terms: $7n = 14$. What is $n$?',
      'Now equate the linear coefficient: $k = n + 7$.'
    ],
    difficulty: 'easy',
    sourcePage: 72,
    similarQuestionIds: ['quad-19']
  },

  // --- EXPRESSIONS ---
  {
    id: 'expr-1',
    section: 'Algebra',
    topic: 'Expressions',
    subtopic: 'Distributive Property',
    questionNumber: 1,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: 'Which expression is equivalent to $7x(x + 4)$?',
    choices: [
      { id: 'A', text: '$7x^2 + 4$' },
      { id: 'B', text: '$7x^2 + 28x$' },
      { id: 'C', text: '$8x^2 + 4$' },
      { id: 'D', text: '$8x^2 + 11x$' },
    ],
    correctAnswer: 'B',
    explanation: 'Apply the distributive property: $7x \\cdot x + 7x \\cdot 4 = 7x^2 + 28x$.',
    hints: [
      'Multiply the term $7x$ by each term inside the parentheses $(x + 4)$.',
      '$7x \\cdot x = 7x^2$ and $7x \\cdot 4 = 28x$.',
      'Combine them: $7x^2 + 28x$.'
    ],
    difficulty: 'easy',
    sourcePage: 9,
    similarQuestionIds: ['expr-7', 'expr-21']
  },
  {
    id: 'expr-2',
    section: 'Algebra',
    topic: 'Expressions',
    subtopic: 'Isolating Variables in Formulas',
    questionNumber: 2,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: '$65 = \\frac{2K}{v^2}$\n\nFor an object with a mass of 65 kilograms, the given equation relates the kinetic energy $K$, in joules, of the object to the object’s speed $v$, in meters per second, where $K$ and $v$ are positive. Which equation correctly expresses this object’s speed, in meters per second, in terms of the object’s kinetic energy, in joules?',
    choices: [
      { id: 'A', text: '$v = \\frac{2K}{65^2}$' },
      { id: 'B', text: '$v = \\frac{65^2}{2K}$' },
      { id: 'C', text: '$v = \\sqrt{\\frac{65}{2K}}$' },
      { id: 'D', text: '$v = \\sqrt{\\frac{2K}{65}}$' },
    ],
    correctAnswer: 'D',
    explanation: 'Multiply both sides by $v^2$: $65v^2 = 2K$.\nDivide by 65: $v^2 = \\frac{2K}{65}$.\nTake the square root of both sides (since $v > 0$): $v = \\sqrt{\\frac{2K}{65}}$.',
    hints: [
      'Multiply both sides by $v^2$ to get it out of the denominator.',
      'Divide both sides by 65 to isolate $v^2$.',
      'Take the square root of both sides.'
    ],
    difficulty: 'medium',
    sourcePage: 9,
    similarQuestionIds: ['expr-6', 'expr-8', 'expr-20']
  },
  {
    id: 'expr-3',
    section: 'Algebra',
    topic: 'Expressions',
    subtopic: 'Percent Increase Expressions',
    questionNumber: 3,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: 'The percent increase in mass of a certain red kangaroo from 110 days old to 210 days old was $773\\%$. If this red kangaroo’s mass was $k$ grams at 110 days old, which expression represents its mass, in grams, at 210 days old?',
    choices: [
      { id: 'A', text: '$0.07k$' },
      { id: 'B', text: '$1.07k$' },
      { id: 'C', text: '$7.73k$' },
      { id: 'D', text: '$8.73k$' },
    ],
    correctAnswer: 'D',
    explanation: 'A percent increase of $773\\%$ means adding $773\\%$ of $k$ to the initial mass $k$:\n$\\text{Mass} = k + \\frac{773}{100}k = k + 7.73k = 8.73k$.',
    hints: [
      'Remember that new amount = original + increase.',
      '$773\\%$ written as a decimal is $7.73$.',
      '$k + 7.73k = (1 + 7.73)k = 8.73k$.'
    ],
    difficulty: 'medium',
    sourcePage: 9,
    similarQuestionIds: ['expr-4']
  },
  {
    id: 'expr-9',
    section: 'Algebra',
    topic: 'Expressions',
    subtopic: 'Exponent Laws & Products',
    questionNumber: 9,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: 'Which expression represents the product of $(x^{-9}y^8z^4)$ and $(x^5z^4 + y^3z^{-7})$?',
    choices: [
      { id: 'A', text: '$x^{-4}y^8z^8 + y^3z^{-7}$' },
      { id: 'B', text: '$4^{-4}z^8 + x^{-9}z^{-3}$' },
      { id: 'C', text: '$x^{-4}y^8z^8 + x^{-9}y^{11}z^{-3}$' },
      { id: 'D', text: '$x^{-4}z^8 + y^{11}z^{-3}$' },
    ],
    correctAnswer: 'C',
    explanation: 'Distribute $(x^{-9}y^8z^4)$ to each term:\nTerm 1: $(x^{-9}y^8z^4)(x^5z^4) = x^{-9+5}y^8z^{4+4} = x^{-4}y^8z^8$.\nTerm 2: $(x^{-9}y^8z^4)(y^3z^{-7}) = x^{-9}y^{8+3}z^{4-7} = x^{-9}y^{11}z^{-3}$.\nSum: $x^{-4}y^8z^8 + x^{-9}y^{11}z^{-3}$. Choice C.',
    hints: [
      'Multiply the outside term by both inside terms individually.',
      'When multiplying powers with the same base, add their exponents ($x^a \\cdot x^b = x^{a+b}$).',
      'For the first term: $-9+5=-4, 4+4=8$. For the second term: $8+3=11, 4-7=-3$.'
    ],
    difficulty: 'medium',
    sourcePage: 10,
    similarQuestionIds: ['expr-16']
  },

  // --- LINEAR EQUATIONS ---
  {
    id: 'lineq-1',
    section: 'Algebra',
    topic: 'Linear Equations',
    subtopic: 'Equations with Fractions',
    questionNumber: 1,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: 'If $\\frac{x - 17}{18} = \\frac{x - 17}{6}$, what is the value of $x + 17$?',
    choices: [
      { id: 'A', text: '0' },
      { id: 'B', text: '3' },
      { id: 'C', text: '17' },
      { id: 'D', text: '34' },
    ],
    correctAnswer: 'D',
    explanation: 'Multiply both sides by 18: $x - 17 = 3(x - 17)$.\n$x - 17 = 3x - 51 \\implies 2x = 34 \\implies x = 17$.\nThe question asks for $x + 17$, so $17 + 17 = 34$.',
    hints: [
      'Notice that $\\frac{A}{18} = \\frac{A}{6}$ requires $A = 0$ since $18 \\neq 6$.',
      'Since $A = x - 17$, we have $x - 17 = 0 \\implies x = 17$.',
      'Careful: The question asks for $x + 17$, not just $x$!'
    ],
    difficulty: 'easy',
    sourcePage: 14,
    similarQuestionIds: ['lineq-23', 'lineq-28']
  },
  {
    id: 'lineq-4',
    section: 'Algebra',
    topic: 'Linear Equations',
    subtopic: 'Number of Solutions in Linear Equations',
    questionNumber: 4,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: '$c(x - 6) = -7(x + k)$\n\nIn the given equation, $c$ and $k$ are constants. The equation has exactly one solution. Which of the following statements must be true?',
    choices: [
      { id: 'A', text: 'The value of $c$ cannot be -7.' },
      { id: 'B', text: 'The value of $c$ cannot be $-\\frac{7}{6}$.' },
      { id: 'C', text: 'The value of $k$ cannot be $\\frac{6}{7}$.' },
      { id: 'D', text: 'The value of $k$ cannot be -6.' },
    ],
    correctAnswer: 'A',
    explanation: 'Expanding both sides: $cx - 6c = -7x - 7k \\implies (c + 7)x = 6c - 7k$.\nA linear equation $Ax = B$ has exactly one solution if and only if the coefficient of $x$ is nonzero ($A \\neq 0$). Thus, $c + 7 \\neq 0 \\implies c \\neq -7$.',
    hints: [
      'Expand both sides and group all terms with $x$ on one side.',
      '$(c + 7)x = 6c - 7k$.',
      'For an equation $Ax = B$ to have exactly one solution, $A$ cannot be zero. So $c + 7 \\neq 0$.'
    ],
    difficulty: 'medium',
    sourcePage: 14,
    similarQuestionIds: ['lineq-44', 'lineq-46']
  },
  {
    id: 'lineq-6',
    section: 'Algebra',
    topic: 'Linear Equations',
    subtopic: 'Absolute Value Equations',
    questionNumber: 6,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: 'If $|16 - 2x| = 58$, which of the following is a value of $8 - x$?',
    choices: [
      { id: 'A', text: '0' },
      { id: 'B', text: '8' },
      { id: 'C', text: '29' },
      { id: 'D', text: '42' },
    ],
    correctAnswer: 'C',
    explanation: 'Notice that $16 - 2x = 2(8 - x)$.\nThus $|16 - 2x| = |2(8 - x)| = 2|8 - x| = 58$.\nDividing by 2 gives $|8 - x| = 29$, which means $8 - x = 29$ or $8 - x = -29$. Choice C gives 29.',
    hints: [
      'Factor out a 2 from inside the absolute value: $|2(8 - x)|$.',
      'Since $|2 \\cdot u| = 2|u|$, we have $2|8 - x| = 58$.',
      'Divide both sides by 2 to find $|8 - x| = 29$.'
    ],
    difficulty: 'medium',
    sourcePage: 14,
    similarQuestionIds: ['lineq-8']
  },
  {
    id: 'lineq-9',
    section: 'Algebra',
    topic: 'Linear Equations',
    subtopic: 'Word Problems & Rates',
    questionNumber: 9,
    examDate: 'September 2025',
    type: 'student_produced',
    text: 'During hibernation, American black bears do not eat or replenish calories. A certain black bear weighed 304 pounds when entering hibernation and lost weight at a rate of 0.6 pound per day. At this rate, how many days after entering hibernation did the black bear weigh 250 pounds?',
    choices: [],
    correctAnswer: '90',
    explanation: 'Let $d$ be the number of days. The weight equation is $304 - 0.6d = 250$.\n$0.6d = 304 - 250 = 54 \\implies d = \\frac{54}{0.6} = 90$ days.',
    hints: [
      'Write the equation for weight after $d$ days: $\\text{Weight} = 304 - 0.6d$.',
      'Set the weight equal to 250: $304 - 0.6d = 250$.',
      'Subtract 304 and divide by $-0.6$: $d = \\frac{54}{0.6} = 90$.'
    ],
    difficulty: 'easy',
    sourcePage: 15,
    similarQuestionIds: ['lineq-24', 'lineq-42']
  },

  // --- LINEAR SYSTEM OF EQUATIONS ---
  {
    id: 'linsys-1',
    section: 'Algebra',
    topic: 'Linear System of Equations',
    subtopic: 'Elimination Method',
    questionNumber: 1,
    examDate: 'August 2025',
    type: 'student_produced',
    text: '$3x + 6y = 17$\n$-3x - 4y = 5$\n\nThe solution to the given system of equations is $(x, y)$. What is the value of $2y$?',
    choices: [],
    correctAnswer: '22',
    explanation: 'Add the two equations directly to eliminate $x$:\n$(3x - 3x) + (6y - 4y) = 17 + 5 \\implies 2y = 22$.',
    hints: [
      'Look at the coefficients of $x$: they are $3$ and $-3$.',
      'Add the two equations together directly to eliminate $x$.',
      'The left side simplifies straight to $2y$.'
    ],
    difficulty: 'easy',
    sourcePage: 24,
    similarQuestionIds: ['linsys-3', 'linsys-18']
  },
  {
    id: 'linsys-2',
    section: 'Algebra',
    topic: 'Linear System of Equations',
    subtopic: 'Substitution Method',
    questionNumber: 2,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: '$y = -12x + 16$\n$y = -20x + 24$\n\nWhat is the solution $(x, y)$ to the given system of equations?',
    choices: [
      { id: 'A', text: '(1, 4)' },
      { id: 'B', text: '(16, 24)' },
      { id: 'C', text: '(24, 16)' },
      { id: 'D', text: '(4, 1)' },
    ],
    correctAnswer: 'A',
    explanation: 'Set both expressions for $y$ equal:\n$-12x + 16 = -20x + 24 \\implies 8x = 8 \\implies x = 1$.\nSubstitute $x = 1$ into $y = -12(1) + 16 = 4$. Solution is $(1, 4)$.',
    hints: [
      'Set the two right-hand expressions for $y$ equal to each other.',
      '$-12x + 16 = -20x + 24$. Solve for $x$.',
      'Substitute $x = 1$ back to calculate $y$.'
    ],
    difficulty: 'easy',
    sourcePage: 24,
    similarQuestionIds: ['linsys-9', 'linsys-15']
  },
  {
    id: 'linsys-12',
    section: 'Algebra',
    topic: 'Linear System of Equations',
    subtopic: 'Number of Intersections',
    questionNumber: 12,
    examDate: 'September 2025',
    type: 'multiple_choice',
    text: '$8x + 32y = 38$\n$12x + 48y = 57$\n\nAt how many points do the graphs of the given equations intersect in the $xy$-plane?',
    choices: [
      { id: 'A', text: 'Exactly one' },
      { id: 'B', text: 'Infinitely many' },
      { id: 'C', text: 'Exactly two' },
      { id: 'D', text: 'Zero' },
    ],
    correctAnswer: 'B',
    explanation: 'Divide the first equation by 8: $x + 4y = 4.75$.\nDivide the second equation by 12: $x + 4y = 4.75$.\nSince both equations represent the exact same line, their graphs intersect at infinitely many points.',
    hints: [
      'Compare the ratios of the coefficients $\\frac{a_1}{a_2}, \\frac{b_1}{b_2}, \\frac{c_1}{c_2}$.',
      '$\\frac{8}{12} = \\frac{2}{3}, \\frac{32}{48} = \\frac{2}{3}, \\frac{38}{57} = \\frac{2}{3}$.',
      'All ratios are identical, meaning the equations are multiples of each other and represent the same line.'
    ],
    difficulty: 'medium',
    sourcePage: 25,
    similarQuestionIds: ['linsys-14', 'linsys-19', 'linsys-29']
  },

  // --- LINEAR FUNCTIONS ---
  {
    id: 'linfunc-1',
    section: 'Algebra',
    topic: 'Linear Functions',
    subtopic: 'Evaluating Linear Models',
    questionNumber: 1,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: 'The function $f(x) = -30x + 310$ gives the predicted height above the ground $f(x)$, in feet, of a model airplane $x$ minutes after it begins to descend. What is the predicted height above the ground, in feet, of the model airplane 2 minutes after it begins to descend?',
    choices: [
      { id: 'A', text: '60' },
      { id: 'B', text: '250' },
      { id: 'C', text: '280' },
      { id: 'D', text: '370' },
    ],
    correctAnswer: 'B',
    explanation: 'Evaluate $f(2) = -30(2) + 310 = -60 + 310 = 250$ feet.',
    hints: [
      'Substitute $x = 2$ into the given function $f(x)$.',
      '$f(2) = -30(2) + 310$.',
      '$-60 + 310 = 250$.'
    ],
    difficulty: 'easy',
    sourcePage: 31,
    similarQuestionIds: ['linfunc-4', 'linfunc-28']
  },
  {
    id: 'linfunc-6',
    section: 'Algebra',
    topic: 'Linear Functions',
    subtopic: 'Finding Slope from Standard Form',
    questionNumber: 6,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: 'What is the slope of the graph of $60x - 10y = -48$ in the $xy$-plane?',
    choices: [
      { id: 'A', text: '-6' },
      { id: 'B', text: '$-\\frac{5}{4}$' },
      { id: 'C', text: '$\\frac{5}{4}$' },
      { id: 'D', text: '6' },
    ],
    correctAnswer: 'D',
    explanation: 'Rearrange into slope-intercept form $y = mx + b$:\n$-10y = -60x - 48 \\implies y = 6x + 4.8$.\nThe slope is $m = 6$.',
    hints: [
      'Isolate $y$ on one side of the equation.',
      '$-10y = -60x - 48$.',
      'Divide all terms by $-10$ to find the coefficient of $x$.'
    ],
    difficulty: 'easy',
    sourcePage: 32,
    similarQuestionIds: ['linfunc-15', 'linfunc-20']
  },

  // --- PERCENT, RATIO & PROPORTION ---
  {
    id: 'prp-1',
    section: 'Problem Solving',
    topic: 'Percent, Ratio & Proportion',
    subtopic: 'Multi-Step Percent Calculations',
    questionNumber: 1,
    examDate: 'September 2025',
    type: 'student_produced',
    text: 'An entomologist placed an initial population of 40 Tenebrio molitor, a type of beetle, into a habitat and monitored the population over time. When the number of Tenebrio molitor in the habitat reached $170\\%$ of the initial population, the entomologist moved $75\\%$ of the Tenebrio molitor to a second habitat. How many Tenebrio molitor did the entomologist move to the second habitat at this time?',
    choices: [],
    correctAnswer: '51',
    explanation: 'Initial population = 40.\nWhen it reached $170\\%$: $40 \\times 1.70 = 68$.\nMoving $75\\%$ of 68: $68 \\times 0.75 = 51$.',
    hints: [
      'First calculate $170\\%$ of the starting 40 beetles: $40 \\times 1.70$.',
      'This gives 68 beetles.',
      'Now find $75\\%$ of 68: $0.75 \\times 68 = 51$.'
    ],
    difficulty: 'medium',
    sourcePage: 80,
    similarQuestionIds: ['prp-5', 'prp-9']
  },
  {
    id: 'prp-6',
    section: 'Problem Solving',
    topic: 'Percent, Ratio & Proportion',
    subtopic: 'Compound Percent Relations',
    questionNumber: 6,
    examDate: 'September 2025',
    type: 'student_produced',
    text: 'For the positive quantities $h, j,$ and $k$, $11\\%$ of $h$ is equivalent to $33\\%$ of $j$, and $j$ is equivalent to $14\\%$ of $k$. What percentage of $k$ is $h$? (Disregard the % sign when entering your answer)',
    choices: [],
    correctAnswer: '42',
    explanation: '$0.11h = 0.33j \\implies h = 3j$.\nGiven $j = 0.14k$, substitute $j$: $h = 3(0.14k) = 0.42k$.\nThus $h$ is $42\\%$ of $k$.',
    hints: [
      'Write the two given equations algebraically: $0.11h = 0.33j$ and $j = 0.14k$.',
      'Simplify the first relation: $h = \\frac{0.33}{0.11}j = 3j$.',
      'Substitute $j = 0.14k$ into $h = 3j$ to get $h = 0.42k = 42\\% k$.'
    ],
    difficulty: 'medium',
    sourcePage: 80,
    similarQuestionIds: ['prp-11', 'prp-12']
  },

  // --- PROBABILITY & DATA ---
  {
    id: 'prob-2',
    section: 'Problem Solving',
    topic: 'Probability',
    subtopic: 'Conditional Probability from Two-Way Table',
    questionNumber: 2,
    examDate: 'September 2025',
    type: 'multiple_choice',
    text: 'The table summarizes the distribution of age and assigned group for 90 participants in a study:\n\nGroup A: 15 (0-9 yrs), 11 (10-19 yrs), 4 (20+ yrs), Total: 30\nGroup B: 4 (0-9 yrs), 5 (10-19 yrs), 21 (20+ yrs), Total: 30\nGroup C: 11 (0-9 yrs), 14 (10-19 yrs), 5 (20+ yrs), Total: 30\nTotal: 30 (0-9 yrs), 30 (10-19 yrs), 30 (20+ yrs), Total: 90\n\nOne of these participants will be selected at random. What is the probability of selecting a participant from Group A, given that the participant is at least 10 years of age?',
    choices: [
      { id: 'A', text: '$\\frac{1}{6}$' },
      { id: 'B', text: '$\\frac{1}{4}$' },
      { id: 'C', text: '$\\frac{11}{30}$' },
      { id: 'D', text: '$\\frac{1}{2}$' },
    ],
    correctAnswer: 'B',
    explanation: 'Total participants who are "at least 10 years of age" = (10-19 yrs) + (20+ yrs) = $30 + 30 = 60$.\nParticipants in Group A who are at least 10 = $11 + 4 = 15$.\nProbability $P(\\text{Group A} \\mid \\ge 10) = \\frac{15}{60} = \\frac{1}{4}$.',
    hints: [
      'Identify the restricted condition: "given that the participant is at least 10 years old".',
      'Calculate the denominator: total participants with age $\\ge 10$ is $30 + 30 = 60$.',
      'Calculate the numerator: Group A participants with age $\\ge 10$ is $11 + 4 = 15$. $\\frac{15}{60} = \\frac{1}{4}$.'
    ],
    difficulty: 'medium',
    sourcePage: 87,
    similarQuestionIds: ['prob-3', 'prob-4', 'prob-6']
  },

  // --- GEOMETRY & TRIGONOMETRY ---
  {
    id: 'trig-1',
    section: 'Geometry & Trigonometry',
    topic: 'Trigonometry',
    subtopic: 'Right Triangle Trigonometric Ratios',
    questionNumber: 1,
    examDate: 'August 2025',
    type: 'multiple_choice',
    text: 'In right triangle $ABC$ with right angle at $B$, hypotenuse $AC = 43$ and adjacent side $AB = 23$. What is the value of $\\cos A$?',
    choices: [
      { id: 'A', text: '$\\frac{1}{43}$' },
      { id: 'B', text: '$\\frac{1}{23}$' },
      { id: 'C', text: '$\\frac{23}{43}$' },
      { id: 'D', text: '$\\frac{43}{23}$' },
    ],
    correctAnswer: 'C',
    explanation: 'By definition of cosine in a right triangle: $\\cos A = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{AB}{AC} = \\frac{23}{43}$.',
    hints: [
      'Recall the SOH CAH TOA definition for cosine: $\\cos = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$.',
      'Side adjacent to angle $A$ is $AB = 23$.',
      'The hypotenuse is $AC = 43$. Therefore $\\cos A = \\frac{23}{43}$.'
    ],
    difficulty: 'easy',
    sourcePage: 120,
    similarQuestionIds: ['trig-3', 'trig-5', 'trig-8']
  },
  {
    id: 'geom-circ-1',
    section: 'Geometry & Trigonometry',
    topic: 'Circle',
    subtopic: 'Circumference & Diameter',
    questionNumber: 1,
    examDate: 'September 2025',
    type: 'student_produced',
    text: 'A circle has circumference of $89\\pi$ centimeters. What is the diameter, in centimeters, of the circle?',
    choices: [],
    correctAnswer: '89',
    explanation: 'The formula for the circumference of a circle is $C = \\pi d$.\nGiven $C = 89\\pi$, dividing by $\\pi$ yields $d = 89$ cm.',
    hints: [
      'Recall the formula for circumference in terms of diameter: $C = \\pi d$.',
      'Substitute $89\\pi = \\pi d$.',
      'Divide both sides by $\\pi$.'
    ],
    difficulty: 'easy',
    sourcePage: 124,
    similarQuestionIds: ['geom-circ-3', 'geom-circ-4']
  },
  {
    id: 'geom-circ-2',
    section: 'Geometry & Trigonometry',
    topic: 'Circle',
    subtopic: 'Equation of a Circle',
    questionNumber: 2,
    examDate: 'September 2025',
    type: 'multiple_choice',
    text: 'Circles A and B are graphed in the $xy$-plane. Circle A is represented by the equation $(x + 8)^2 + (y - 8)^2 = 64$ and intersects the $x$-axis at the point $(r, s)$. Circle B has its center at $(r, s)$ and has a radius of the same length as circle A. Which equation represents circle B?',
    choices: [
      { id: 'A', text: '$x^2 + (y + 8)^2 = 64$' },
      { id: 'B', text: '$x^2 + (y - 8)^2 = 64$' },
      { id: 'C', text: '$(x + 8)^2 + y^2 = 64$' },
      { id: 'D', text: '$(x - 8)^2 + y^2 = 64$' },
    ],
    correctAnswer: 'C',
    explanation: 'For Circle A, the center is $(-8, 8)$ and radius $R = 8$.\nSince its distance from the center to the $x$-axis is $8 = R$, it touches the $x$-axis tangent at $y = 0$, giving the intersection point $(-8, 0)$.\nCircle B has center at $(-8, 0)$ and radius 8, so its equation is $(x - (-8))^2 + (y - 0)^2 = 8^2 \\implies (x + 8)^2 + y^2 = 64$.',
    hints: [
      'Find where Circle A intersects the $x$-axis by setting $y = 0$.',
      '$(x + 8)^2 + (0 - 8)^2 = 64 \\implies (x+8)^2 + 64 = 64 \\implies x = -8$, so $(r,s) = (-8,0)$.',
      'Write the equation for a circle with center $(-8,0)$ and radius 8: $(x + 8)^2 + y^2 = 64$.'
    ],
    difficulty: 'medium',
    sourcePage: 124,
    similarQuestionIds: ['geom-circ-9', 'geom-circ-15']
  }
];

export const MATHBOOK_TOPICS = [
  { id: 'expressions', name: 'Expressions', section: 'Algebra' as const, count: 24 },
  { id: 'linear-equations', name: 'Linear Equations', section: 'Algebra' as const, count: 48 },
  { id: 'linear-systems', name: 'Linear System of Equations', section: 'Algebra' as const, count: 32 },
  { id: 'linear-functions', name: 'Linear Functions', section: 'Algebra' as const, count: 32 },
  { id: 'linear-inequalities', name: 'Linear Inequalities', section: 'Algebra' as const, count: 18 },
  { id: 'polynomials', name: 'Polynomials', section: 'Advanced Math' as const, count: 14 },
  { id: 'exponents-radicals', name: 'Exponents & Radicals', section: 'Advanced Math' as const, count: 7 },
  { id: 'functions-notation', name: 'Functions & Function Notation', section: 'Advanced Math' as const, count: 23 },
  { id: 'exponential-functions', name: 'Exponential Functions', section: 'Advanced Math' as const, count: 34 },
  { id: 'quadratics', name: 'Quadratics', section: 'Advanced Math' as const, count: 40 },
  { id: 'percent-ratios', name: 'Percent, Ratio & Proportion', section: 'Problem Solving' as const, count: 18 },
  { id: 'unit-conversion', name: 'Unit Conversion', section: 'Problem Solving' as const, count: 9 },
  { id: 'probability', name: 'Probability', section: 'Problem Solving' as const, count: 6 },
  { id: 'mean-median-mode', name: 'Mean, Median, Mode, Range', section: 'Problem Solving' as const, count: 11 },
  { id: 'scatterplots', name: 'Scatterplots', section: 'Problem Solving' as const, count: 13 },
  { id: 'research-organizing', name: 'Research Organizing', section: 'Problem Solving' as const, count: 6 },
  { id: 'lines-angles', name: 'Lines and Angles', section: 'Geometry & Trigonometry' as const, count: 18 },
  { id: 'triangles', name: 'Triangles', section: 'Geometry & Trigonometry' as const, count: 12 },
  { id: 'trigonometry', name: 'Trigonometry', section: 'Geometry & Trigonometry' as const, count: 10 },
  { id: 'circle', name: 'Circle', section: 'Geometry & Trigonometry' as const, count: 16 },
  { id: 'area-volume', name: 'Area and Volume', section: 'Geometry & Trigonometry' as const, count: 23 },
];

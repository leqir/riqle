/**
 * Metric Interpretation Helpers
 *
 * Translate numbers into actionable insights
 */

export interface InterpretationResult {
  status: 'good' | 'needs_attention' | 'poor' | 'healthy' | 'warning' | 'unhealthy';
  message: string;
  actions: string[];
}

export function interpretEmployerUnderstanding(metrics: {
  homepageBounceRate: number;
  navigationToProof: number;
}): InterpretationResult {
  const { homepageBounceRate, navigationToProof } = metrics;

  if (homepageBounceRate < 0.6 && navigationToProof > 0.3) {
    return {
      status: 'good',
      message: 'Employers are understanding quickly. Low bounce + good routing.',
      actions: [],
    };
  }

  if (homepageBounceRate > 0.8 || navigationToProof < 0.2) {
    return {
      status: 'poor',
      message: 'High bounce or poor routing. Positioning may be unclear.',
      actions: [
        'Review homepage copy with fresh eyes',
        'Test with real employers',
        'Simplify above-fold content',
      ],
    };
  }

  return {
    status: 'needs_attention',
    message: 'Mixed signals. Monitor trends.',
    actions: ['Continue observing trends'],
  };
}

export function interpretProofEffectiveness(metrics: {
  avgTimeOnProjects: number;
  writingScrollDepth: number;
}): InterpretationResult {
  const { avgTimeOnProjects, writingScrollDepth } = metrics;

  if (avgTimeOnProjects > 60 && writingScrollDepth > 50) {
    return {
      status: 'good',
      message: 'Proof is resonating. High engagement on projects and writing.',
      actions: [],
    };
  }

  if (avgTimeOnProjects < 30 || writingScrollDepth < 25) {
    return {
      status: 'poor',
      message: 'Low engagement. Content may not be resonating.',
      actions: ['Review project framing', 'Check content quality', 'Simplify navigation'],
    };
  }

  return {
    status: 'needs_attention',
    message: 'Some engagement. Look for patterns.',
    actions: ['Identify which content performs best'],
  };
}

export function interpretCommerceHealth(metrics: {
  refundRate: number;
  supportRate: number;
}): InterpretationResult {
  const { refundRate, supportRate } = metrics;

  if (refundRate < 0.05 && supportRate < 0.1) {
    return {
      status: 'healthy',
      message: 'Commerce is healthy. Low refunds + low support = trust intact.',
      actions: [],
    };
  }

  if (refundRate > 0.15 || supportRate > 0.25) {
    return {
      status: 'unhealthy',
      message: 'High refunds or support requests. Trust may be breaking.',
      actions: [
        'Review product page clarity',
        'Check access delivery flow',
        'Interview customers who refunded',
      ],
    };
  }

  return {
    status: 'warning',
    message: 'Commerce functioning but watch trends.',
    actions: ['Monitor refund reasons', 'Track support requests'],
  };
}

export function interpretOperationalHealth(metrics: {
  checkoutFailures: number;
  webhookFailures: number;
  errorRate: number;
}): InterpretationResult {
  const { checkoutFailures, webhookFailures, errorRate } = metrics;

  if (checkoutFailures === 0 && webhookFailures === 0 && errorRate < 0.001) {
    return {
      status: 'healthy',
      message: 'All systems functioning normally.',
      actions: [],
    };
  }

  if (checkoutFailures > 5 || webhookFailures > 10 || errorRate > 0.01) {
    return {
      status: 'unhealthy',
      message: 'System issues detected. Immediate attention needed.',
      actions: ['Check error logs immediately', 'Review failed jobs', 'Test critical flows'],
    };
  }

  return {
    status: 'warning',
    message: 'Minor issues detected. Monitor closely.',
    actions: ['Review error patterns', 'Check for trends'],
  };
}

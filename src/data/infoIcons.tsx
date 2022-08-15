import {
  AppleLogo,
  Browsers,
  Calendar,
  ClockCounterClockwise,
  GlobeHemisphereEast,
  Hash,
  Sparkle,
} from 'phosphor-react';

export const trackWhatYouWant = [
  {
    key: '1',
    icon: <Hash />,
    description: 'Create a personalized budget for you',
  },
  { key: '2', icon: <Sparkle />, description: 'Unlimited categories' },
];

export const onTheGo = [
  {
    key: '1',
    icon: <Browsers />,
    description: 'Budget on any browser',
  },
  { key: '2', icon: <AppleLogo />, description: 'Budget on iOS' },
  { key: '3', icon: <GlobeHemisphereEast />, description: 'Budget...anywhere' },
];

export const viewYourHistory = [
  {
    key: '1',
    icon: <Calendar />,
    description: 'History logs',
  },
  {
    key: '2',
    icon: <ClockCounterClockwise />,
    description: 'Turn back the clock to any or all previous months',
  },
];

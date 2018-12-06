import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

  export const enterLeave = trigger('enterLeave', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms 350ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('200ms', style({ opacity: 0 }))
    ])
  ]);

  export const enterDelay3sec = trigger('enterDelay3sec', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms 3s', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('200ms', style({ opacity: 0 }))
    ])
  ]);

  export const leave = trigger('leave', [
    transition(':leave', [
      animate('200ms', style({ opacity: 0 }))
    ])
  ]);


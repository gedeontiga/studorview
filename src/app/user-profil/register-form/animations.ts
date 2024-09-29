import {
  trigger,
  style,
  animate,
  transition,
  query,
  group,
} from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  transition(':increment', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%',
        opacity: 1,
      }),
    ]),
    group([
      query(':leave', [
        animate(
          '500ms ease',
          style({ transform: 'translateX(-100%)', opacity: 0 })
        ),
      ]),
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '500ms ease',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ]),
  transition(':decrement', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%',
        opacity: 1,
      }),
    ]),
    group([
      query(':leave', [
        animate(
          '500ms ease',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
      query(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '500ms ease',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ]),
]);

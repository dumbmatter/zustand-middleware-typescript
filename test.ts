// See https://github.com/pmndrs/zustand/discussions/619

import create, { GetState, SetState } from 'zustand';
import { StoreApiWithSubscribeWithSelector, subscribeWithSelector } from 'zustand/middleware'

type MyState = {
    foo: boolean | string;
};

// This doesn't work:
// Type 'MyState' is not assignable to type '{ foo: true; }'.
//   Types of property 'foo' are incompatible.
//     Type 'string | boolean' is not assignable to type 'true'.
//       Type 'string' is not assignable to type 'true'.ts
const useStore1 = create<
    MyState,
    SetState<MyState>,
    GetState<MyState>,
    StoreApiWithSubscribeWithSelector<MyState>
>(subscribeWithSelector(() => ({ foo: true })));

// This does work
const useStore2 = create(subscribeWithSelector<
    MyState,
    SetState<MyState>,
    GetState<MyState>,
    StoreApiWithSubscribeWithSelector<MyState>
>(() => ({ foo: true })));

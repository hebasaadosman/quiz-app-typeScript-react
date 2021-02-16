import React, { PureComponent } from 'react'
export const shufflearray=(Array:any[])=>

[...Array].sort(()=>Math.random()-0.5)
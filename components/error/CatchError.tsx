import * as React from 'react'
import Error, { FallbackComponentProps } from './Error'

export interface ICatchErrorOption {
  onError?: (error: Error, componentStack: string) => void;
  FallbackComponent?: React.ComponentType<FallbackComponentProps>;
}

export const CatchError = ({
  FallbackComponent,
  onError,
}: ICatchErrorOption = {}) => (BaseComponent: any) => (props: any) => (
  <Error FallbackComponent={FallbackComponent} onError={onError}>
    <BaseComponent {...props} />
  </Error>
);

export default CatchError
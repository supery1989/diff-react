import * as React from 'react'

export function GetExtraStyle(isInline: boolean, depth: number, inlineIndent: number) {
  let styleObject = {};

  if (isInline) {
    styleObject = {
      paddingLeft: `${depth * inlineIndent}px`,
    };
  }

  return styleObject;
}

export function GetKeyFromChildrenIndex(index: number, subPrefix = 'item') {
  return `${subPrefix}_${index}`;
}

export function RenderCommonItem(component: any, index: number, subPrefix: string | undefined, extraProps: object) {
  const newChildProps = {
    specKey: GetKeyFromChildrenIndex(index, subPrefix),
    ...extraProps,
    ...component.props
  };

  return React.cloneElement(component, newChildProps);
}
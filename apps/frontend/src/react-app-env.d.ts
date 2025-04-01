/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace React {
  interface StatelessComponent<P = {}> {
    (props: P & { children?: React.ReactNode }, context?: any): React.ReactElement<any> | null;
    displayName?: string;
    defaultProps?: Partial<P>;
  }

  interface ComponentClass<P = {}> {
    new (props: P, context?: any): React.Component<P, any>;
    displayName?: string;
    defaultProps?: Partial<P>;
  }
}

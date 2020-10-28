import * as React from "react";
import { TextFileEditorContext } from "./context";

const DefaultState = {
  loading: true,
  data: null,
  error: null
};

export function useData(url, options) {
  const [state, setState] = React.useState(DefaultState);

  const { service } = React.useContext(TextFileEditorContext);

  const session = React.useRef(0);

  React.useEffect(() => {
    setState(DefaultState);

    const current = session.current;
    let data, error;
    service
      .read(url, options)
      .then((d) => {
        data = d;
      })
      .catch((err) => {
        error = err;
      })
      .finally(() => {
        if (current === session.current) {
          setState({
            loading: false,
            data,
            error
          });
        }
      });

    return () => {
      session.current = current + 1;
    };
  }, [url, options, service]);

  return state;
}

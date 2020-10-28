import React from "react";
import clsx from "clsx";

import { useData } from "./text-file-svc";

const BlockName = "txt-f-prv";

const DefaultCodeMirrorOption = {
  mode: "text/plain",
  theme: "material",
  readOnly: "nocursor"
};

let FileTextPreview = React.forwardRef(function FileTextPreview(props, ref) {
  const {
    url,
    limit,
    // code mirror options
    options: optionsProp,
    className: classNameProp,
    ...otherProps
  } = props;

  const { loading, data, error } = useData(url);

  const className = React.useMemo(() => clsx(BlockName, classNameProp), [
    classNameProp
  ]);

  const options = React.useMemo(() => {
    return {
      ...DefaultCodeMirrorOption,
      ...{ mode: data?.mode },
      ...optionsProp
    };
  }, [data, optionsProp]);

  if (loading) {
    return "loading";
  }

  if (data) {
    return data.text;
  }

  return "error";
});

export default FileTextPreview;

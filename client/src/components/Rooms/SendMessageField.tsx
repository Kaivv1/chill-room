import {
  ComponentPropsWithRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithRef<"textarea">;

export const SendMessageArea = forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    const textarea = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => textarea.current as HTMLTextAreaElement);
    const [shouldScroll, setShouldScroll] = useState(false);

    // useEffect(
    //   function () {
    //     function resize() {
    //       const textarea = txarea.current;
    //       if (textarea) {
    //         if (textarea.style.height === "120px") {
    //           setShouldScroll(true);
    //         } else {
    //           textarea.style.height = `${textarea.scrollHeight}px`;
    //           setShouldScroll(false);
    //         }
    //       }
    //       console.log(shouldScroll, textarea!.style.height);
    //     }
    //     const textarea = txarea.current!;
    //     textarea.addEventListener("input", resize);

    //     return () => textarea.removeEventListener("input", resize);
    //   },
    //   [shouldScroll]
    // );
    return (
      <Textarea
        {...props}
        className={cn(
          props.className,
          `resize-none max-h-[120px] ${
            shouldScroll ? "overflow-auto" : "overflow-hidden"
          }`
        )}
        ref={textarea}
      />
    );
  }
);

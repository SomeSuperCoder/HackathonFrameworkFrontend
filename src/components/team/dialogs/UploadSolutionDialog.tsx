import { teamDriver, type ParsedTeam } from "@/api/team";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus, SquarePen, Trash2, Upload } from "lucide-react";
import ErrorLabel from "@/components/ErrorLabel";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  presentation_uri: z.url("Некорреестная ссылка"),
  urls: z.array(
    z.object({
      value: z.url("Некорректная ссылка").min(1),
    }),
  ),
});
type FormFields = z.infer<typeof schema>;

export default function UploadSolutionDialog(props: { team: ParsedTeam }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      presentation_uri: props.team.presentation_uri,
      urls: props.team.repos.map((v) => ({
        value: v,
      })),
    },
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "urls",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await teamDriver.update(props.team._id, {
      repos: data.urls.map((v) => v.value),
      presentation_uri: data.presentation_uri,
    });
    queryClient.invalidateQueries({
      queryKey: ["team", props.team._id.toHexString()],
    });
  };

  const editMode = props.team.repos.length || props.team.presentation_uri;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {editMode ? (
          <Button variant="secondary" size="sm">
            Редактировать решение
            <SquarePen />
          </Button>
        ) : (
          <Button size="sm">
            Загрузить решение
            <Upload />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Отправка решения</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("presentation_uri")}
              type="text"
              placeholder="Ссылка на перезентацию"
              id="presentation_uri"
            />
            <ErrorLabel
              htmlFor="presentation_uri"
              message={errors.presentation_uri?.message}
            />
            {/* URLs */}
            <div className="flex gap-2">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Ссылки на Git
              </h4>
              <Button
                onClick={() =>
                  append({
                    value: "",
                  })
                }
                size="icon-sm"
              >
                <Plus />
              </Button>
            </div>
            {fields.map((_, index) => {
              return (
                <div key={index}>
                  <InputGroup>
                    <InputGroupInput
                      {...register(`urls.${index}.value`)}
                      id={index.toString()}
                      type="text"
                      placeholder="Ссылка на Git репозиторий"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        size="icon-sm"
                        onClick={() => remove(index)}
                      >
                        <Trash2 />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.urls?.[index]?.value && (
                    <ErrorLabel
                      htmlFor={index.toString()}
                      message={errors.urls?.[index].value?.message}
                    />
                  )}
                </div>
              );
            })}
            {/* End URLs */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => reset()}>
                  Отмена
                </Button>
              </DialogClose>
              <Button disabled={isSubmitting} type="submit">
                Отправить
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

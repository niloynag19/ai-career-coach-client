"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";
import { Controller } from "react-hook-form";

const serviceSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  shortDesc: z.string().min(5, "Short description must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  icon: z.string().min(1, "Icon name is required"),
  image: z.string().optional().or(z.literal("")),
  isPopular: z.boolean(),
  features: z.array(z.string()).min(1, "Add at least one feature"),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: any;
  onSuccess: () => void;
}

const CATEGORIES = [
  "RESUME",
  "COACHING",
  "INTERVIEW",
  "ROADMAP",
  "ATS",
  "SKILLS",
  "JOB",
];

export function ServiceDialog({
  open,
  onOpenChange,
  service,
  onSuccess,
}: ServiceDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      shortDesc: "",
      description: "",
      category: "",
      icon: "Zap",
      image: "",
      isPopular: false,
      features: [],
    },
  });

  useEffect(() => {
    if (open) {
      if (service) {
        reset({
          title: service.title,
          shortDesc: service.shortDesc,
          description: service.description,
          category: service.category,
          icon: service.icon || "Zap",
          image: service.image || "",
          isPopular: service.isPopular || false,
          features: service.features || [],
        });
      } else {
        reset({
          title: "",
          shortDesc: "",
          description: "",
          category: "",
          icon: "Zap",
          image: "",
          isPopular: false,
          features: [],
        });
      }
    }
  }, [service, reset, open]);

  async function onSubmit(data: ServiceFormValues) {
    setIsLoading(true);
    try {
      if (service) {
        await api.put(`/services/${service.id}`, data);
        toast.success("Service updated successfully");
      } else {
        await api.post("/services", data);
        toast.success("Service created successfully");
      }
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const addFeature = () => {
    if (!featureInput.trim()) return;
    const currentFeatures = watch("features");
    setValue("features", [...currentFeatures, featureInput.trim()]);
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    const currentFeatures = watch("features");
    setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service ? "Edit Service" : "Add New Service"}</DialogTitle>
          <DialogDescription>
            {service
              ? "Update the details of the existing service."
              : "Create a new AI service for the platform."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                placeholder="Resume Analyzer" 
                {...register("title")} 
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDesc">Short Description</Label>
            <Input 
              id="shortDesc" 
              placeholder="Brief catchphrase for cards" 
              {...register("shortDesc")} 
            />
            {errors.shortDesc && (
              <p className="text-xs text-destructive">{errors.shortDesc.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed explanation of the service..."
              className="min-h-[100px]"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon Name (Lucide)</Label>
              <Input 
                id="icon" 
                placeholder="Zap, Search, Bot..." 
                {...register("icon")} 
              />
              {errors.icon && (
                <p className="text-xs text-destructive">{errors.icon.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL (Optional)</Label>
              <Input 
                id="image" 
                placeholder="https://..." 
                {...register("image")} 
              />
              {errors.image && (
                <p className="text-xs text-destructive">{errors.image.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
            <Controller
              name="isPopular"
              control={control}
              render={({ field }) => (
                <input
                  id="isPopular"
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              )}
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="isPopular" className="cursor-pointer">Popular Service</Label>
              <p className="text-sm text-muted-foreground">
                Mark this as a featured/popular service.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Features</Label>
            <div className="flex gap-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
              />
              <Button type="button" size="icon" onClick={addFeature}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {watch("features").map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            {errors.features && (
              <p className="text-xs text-destructive">
                {errors.features.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {service ? "Update Service" : "Create Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

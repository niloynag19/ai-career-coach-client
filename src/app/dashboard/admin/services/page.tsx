"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { ServiceDialog } from "./service-dialog";

export default function AdminServicesPage() {
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const limit = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-services", page],
    queryFn: async () => {
      const res = await api.get(`/services?page=${page}&limit=${limit}`);
      return res as any;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await api.delete(`/services/${id}`);
      toast.success("Service deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete service");
    }
  };

  const handleEdit = (service: any) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedService(null);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Card className="border-border/50 shadow-sm animate-in fade-in">
        <CardHeader>
          <CardTitle>Service Management</CardTitle>
          <CardDescription>Manage the AI tools and services offered on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const services = data?.data || [];
  const meta = data?.meta || { totalPages: 1, page: 1 };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Services</h2>
          <p className="text-muted-foreground">Manage your platform's offerings.</p>
        </div>
        <Button className="shrink-0 gap-2" onClick={handleAdd}>
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      <Card className="border-border/50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardContent className="p-0">
          <div className="rounded-md border-0 bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>Service Info</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service: any) => (
                  <TableRow key={service.id} className="group">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{service.title}</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[300px]">
                          {service.shortDesc}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{service.category.replace("-", " ")}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={service.isPopular ? "default" : "secondary"}>
                        {service.isPopular ? "Popular" : "Standard"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => handleEdit(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {services.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      No services found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {meta.totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing page {page} of {meta.totalPages}
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ServiceDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        service={selectedService}
        onSuccess={refetch}
      />
    </div>
  );
}

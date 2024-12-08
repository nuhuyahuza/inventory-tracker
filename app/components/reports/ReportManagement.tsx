"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ReportList } from "./ReportList"
import { ScheduledReports } from "./ScheduledReports"
import { ReportTemplates } from "./ReportTemplates"
import { ReportArchive } from "./ReportArchive"

export function ReportManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Report Management</h2>
          <p className="text-muted-foreground">
            Manage your reports, schedules, and templates
          </p>
        </div>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <ReportList />
        </TabsContent>

        <TabsContent value="scheduled">
          <ScheduledReports />
        </TabsContent>

        <TabsContent value="templates">
          <ReportTemplates />
        </TabsContent>

        <TabsContent value="archive">
          <ReportArchive />
        </TabsContent>
      </Tabs>
    </div>
  )
} 
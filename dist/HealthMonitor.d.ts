/**
 * Health Monitor for Freetime SDK - Tracks operational health and system status.
 * Ported from Android HealthMonitor v1.1.0
 */
export declare class HealthMonitor {
    private isMonitoring;
    private healthData;
    private listeners;
    constructor();
    private initializeDefaultHealthMetrics;
    /**
     * Start passive monitoring of SDK and system health
     */
    startPassiveMonitoring(): void;
    /**
     * Stop all monitoring activities
     */
    stopMonitoring(): void;
    /**
     * Perform an active health measurement
     */
    measureCurrentHealth(): Promise<HealthReport>;
    private performHealthCheck;
    /**
     * Add a listener for health updates
     */
    addHealthListener(listener: (data: any) => void): void;
    /**
     * Remove a health listener
     */
    removeHealthListener(listener: (data: any) => void): void;
    private notifyListeners;
    /**
     * Get the latest health report
     */
    getHealthReport(): HealthReport;
    /**
     * Log an SDK error to the health monitor
     */
    logError(error: Error | string): void;
}
export interface HealthReport {
    status: 'healthy' | 'degraded' | 'critical';
    lastHeartbeat: number;
    metrics: any;
}
//# sourceMappingURL=HealthMonitor.d.ts.map
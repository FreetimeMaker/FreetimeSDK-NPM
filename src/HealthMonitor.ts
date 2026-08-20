/**
 * Health Monitor for Freetime SDK - Tracks operational health and system status.
 * Ported from Android HealthMonitor v1.1.0
 */
export class HealthMonitor {
    private isMonitoring: boolean = false;
    private healthData: Map<string, any> = new Map();
    private listeners: Set<(data: any) => void> = new Set();

    constructor() {
        this.initializeDefaultHealthMetrics();
    }

    private initializeDefaultHealthMetrics(): void {
        this.healthData.set('sdk_status', 'healthy');
        this.healthData.set('last_heartbeat', Date.now());
        this.healthData.set('api_latency', 0);
        this.healthData.set('error_count', 0);
    }

    /**
     * Start passive monitoring of SDK and system health
     */
    startPassiveMonitoring(): void {
        if (this.isMonitoring) return;
        this.isMonitoring = true;

        // Simulate periodic background health checks
        const interval = setInterval(() => {
            if (!this.isMonitoring) return;
            this.performHealthCheck();
        }, 60000); // Every minute

        // Ensure the interval doesn't keep the process alive in Node.js
        if (interval.unref) {
            interval.unref();
        }
    }

    /**
     * Stop all monitoring activities
     */
    stopMonitoring(): void {
        this.isMonitoring = false;
    }

    /**
     * Perform an active health measurement
     */
    async measureCurrentHealth(): Promise<HealthReport> {
        this.performHealthCheck();
        return this.getHealthReport();
    }

    private performHealthCheck(): void {
        const report = {
            timestamp: Date.now(),
            memoryUsage: process.memoryUsage(),
            uptime: process.uptime(),
            sdkStatus: 'healthy',
            latency: Math.floor(Math.random() * 50) + 10 // Simulated latency
        };

        this.healthData.set('last_report', report);
        this.healthData.set('last_heartbeat', report.timestamp);

        this.notifyListeners(report);
    }

    /**
     * Add a listener for health updates
     */
    addHealthListener(listener: (data: any) => void): void {
        this.listeners.add(listener);
    }

    /**
     * Remove a health listener
     */
    removeHealthListener(listener: (data: any) => void): void {
        this.listeners.delete(listener);
    }

    private notifyListeners(data: any): void {
        this.listeners.forEach(listener => listener(data));
    }

    /**
     * Get the latest health report
     */
    getHealthReport(): HealthReport {
        const lastReport = this.healthData.get('last_report') || {};
        return {
            status: this.healthData.get('sdk_status'),
            lastHeartbeat: this.healthData.get('last_heartbeat'),
            metrics: lastReport
        };
    }

    /**
     * Log an SDK error to the health monitor
     */
    logError(error: Error | string): void {
        const count = this.healthData.get('error_count') || 0;
        this.healthData.set('error_count', count + 1);
        this.healthData.set('last_error', error.toString());
        this.healthData.set('sdk_status', 'degraded');
    }
}

export interface HealthReport {
    status: 'healthy' | 'degraded' | 'critical';
    lastHeartbeat: number;
    metrics: any;
}

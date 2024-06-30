import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  loadScript(scriptUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = () => resolve();
      scriptElement.onerror = (error) => reject(error);
      document.body.appendChild(scriptElement);
    });
  }

  executeScript(scriptContent: string): void {
    const scriptElement = document.createElement('script');
    scriptElement.text = scriptContent;
    document.body.appendChild(scriptElement);
  }
}
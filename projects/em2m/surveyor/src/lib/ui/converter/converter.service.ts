import {Injectable, Injector, Type} from '@angular/core';
import {ExtensionService} from '../../core/extension/extension.service';
import {Extension} from '../../core/extension/extension.model';
import {Converter} from './converter.component';

@Injectable()
export class ConverterService {

  private converters: { [type: string]: Converter } = {};
  private CONVERTER_EXTENSION_TYPE = 'surveyor:converter';

  constructor(private extensionService: ExtensionService, private injector: Injector) {
    this.registerConverters();
  }

  registerConverters() {
    // Register all components defined as plugin extensions
    this.extensionService.getExtensionsForType(this.CONVERTER_EXTENSION_TYPE).forEach((extension: Extension) => {
      const converterType = extension.value as Type<Converter>;
      const instance: Converter = this.injector.get(converterType);
      if (converterType) {
        this.registerConverter(extension?.config?.type, instance);
      }
    });
  }

  registerConverter(type: string, converter: Converter) {
    this.converters[type] = converter;
  }

  getConverter(type: string): Converter {
    return this.converters[type];
  }
}
